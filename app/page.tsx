"use client";
import Image from "next/image";
import { PluseIcon } from "@/components/svg/PlusIcon";
import { SwitchColumnButton } from "@/components/svg/SwitchColumnButton";
import { RemoveColumnButton } from "@/components/svg/RemoveColumnButton";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import React, {
  useState,
  Fragment,
  useRef,
  useEffect,
  useReducer,
} from "react";
import { ColumnSelectionModal } from "@/components/ColumnSelectionModal";
import {
  EmissionHistoryWithData,
  WidgetData,
  WidgetSelectionModal,
} from "@/components/WidgetSelectionModal";
import DI from "@/di-container";
import { AxiosClient } from "@/utils/clients";
import axios from "axios";
import useUpdateSearchParams from "@/hooks/useUpdateSearchParams";
import { useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";
import { ReportSection, ReportSectionType, WidgetType } from "@/types/reports";
import { generateUUID } from "@/utils";
import { EmissionHistoryData } from "@/types";
import ChartWidget from "@/components/ChartWidget";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import InnerFullPageLoader from "@/components/loaders/InnerFullLoader";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { url } from "inspector";
import Head from "next/head";

import SectionContent from "@/components/SectionContent";
import { stat } from "fs";
import { Draggable } from "react-drag-reorder";

type StateType = {
  isLoading: boolean;
  report: any;
  sections: ReportSection[];
  openColumnsModal: boolean;
  openWidgetsModal: boolean;
  widgetToBeAddedIndex: number | null;
  selectSectionIndex: number | null;

  isSaving: boolean;
};

export default function Home() {
  const [state, updateState] = useReducer(
    (state: StateType, newState: Partial<StateType>) => {
      return { ...state, ...newState };
    },
    {
      isLoading: false,
      report: null,
      sections: [],
      openColumnsModal: false,
      openWidgetsModal: false,
      widgetToBeAddedIndex: null,
      selectSectionIndex: null,
      isSaving: false,
    }
  );
  const [getQueryString, pushRoute] = useUpdateSearchParams();
  const searchParams = useSearchParams();
  let reportId = searchParams.get("reportId");
  let token = searchParams.get("userToken");

  const reportModule = useSelector(
    (state: RootState) => state.reportModule.report
  );

  const printSectionRef = useRef(null);
  const printResult = useReactToPrint({
    bodyClass: "printBody",
    content: () => printSectionRef.current,
    documentTitle: `${state.report?.title}`,
  });

  async function getReportById(id: string) {
    if (!reportId) return;
    updateState({ isLoading: true });
    try {
      const res = await DI.reportService.getReport(id);
      const content = res?.data?.content;
      const parsedContent = JSON.parse(content);
      updateState({
        isLoading: false,
        sections: parsedContent,
        report: res?.data,
      });
    } catch (error: any) {
      if (error?.response?.status === 401) {
        alert("You are not authorized to view this report");
      }
    } finally {
      updateState({ isLoading: false });
    }
  }

  useEffect(() => {
    getReportById(reportId as string);
  }, [reportId]);

  useEffect(() => {
    if (token) {
      setCookie("reportModuleToken", token as string, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365 * 10),
        path: "/",
      });
    }
  }, [token]);

  function onWidgetAdded({
    type,
    data,
  }: {
    type: string;
    data: {
      chartData: EmissionHistoryWithData | null;
      text: string;
    };
  }) {
    const widgetIndex = state.widgetToBeAddedIndex;
    const sectionIndex = state.selectSectionIndex;

    if (widgetIndex === null || sectionIndex === null) return;
    const updatedSection = state.sections[sectionIndex];
    const updatedWidget = {
      id: generateUUID(),
      type: type as WidgetType,
      data: data as any,
      value: null,
    };

    updatedSection?.widgets?.unshift(updatedWidget);
    const findIndex = state.sections.findIndex(
      (s) => s?.id === updatedSection.id
    );

    updateState({
      sections: [
        //update the section at the index
        ...state.sections.slice(0, findIndex),
        updatedSection,
        ...state.sections.slice(findIndex + 1),
      ],
      selectSectionIndex: null,
      widgetToBeAddedIndex: null,
      openWidgetsModal: false,
    });
  }

  function onSectionAdded(type: ReportSectionType) {
    const newSection = {
      id: generateUUID(),
      title: `Section Title`,
      subtitle: `Section Subtile`,
      type,
      widgets: [],
    };

    updateState({
      sections: state.sections.concat(newSection),
      openColumnsModal: false,
    });
  }

  function removeSection(section: ReportSection) {
    const filteredSections = state.sections.filter((s) => s.id !== section.id);
    updateState({
      sections: [...filteredSections],
    });
  }

  function onTextEditorUpdate(
    text: string,
    widgetIndex: number,
    sectionIndex: number
  ) {
    const updatedSection = state.sections[sectionIndex];
    const updatedWidget = updatedSection?.widgets?.[widgetIndex];
    updatedWidget.data.text = text;
    const findIndex = state.sections.findIndex(
      (s) => s?.id === updatedSection.id
    );
    updateState({
      sections: [
        ...state.sections.slice(0, findIndex),
        updatedSection,
        ...state.sections.slice(findIndex + 1),
      ],
    });
  }

  async function saveReport() {
    const content = JSON.stringify(state.sections, null, 2);

    try {
      updateState({ isSaving: true });
      const res = await DI.reportService.updateReport(reportId as string, {
        content,
      });
      const notify = () => toast("Report saved successfully!");
      notify();
    } finally {
      updateState({ isSaving: false });
    }
  }

  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const dragItem = React.useRef<any>(null);
  const dragOverItem = React.useRef<any>(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let new_sections = [...state.sections];

    //remove and save the dragged item content
    const draggedItemContent = new_sections.splice(dragItem.current, 1)[0];

    //switch the position
    new_sections.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setTimeout(() => {
      updateState({ sections: new_sections });
      forceUpdate();
    });
  };

  return (
    <main className="min-h-screen  p-24 bg-[#F7F7F7]">
      <Head>
        <title>{reportModule?.name}</title>
        <meta name="description" content={reportModule?.name} />
      </Head>
      {state.isLoading ? (
        <InnerFullPageLoader />
      ) : (
        <>
          <div className="flex justify-between gap-2 mb-3 items-center">
            <h2 className="text-2xl">
              Report: <span className="font-medium">{reportModule?.name}</span>
            </h2>
            <div className="flex gap-2">
              <button
                className="inline-flex items-center gap-1 bg-white border border-gray-300 py-3 pl-4 pr-6 rounded-lg "
                onClick={() => {
                  saveReport();
                }}
                disabled={state.isSaving}
              >
                {state.isSaving ? "Saving..." : "Save"}
              </button>
              <button
                className="inline-flex items-center gap-1 bg-white border border-gray-300 py-3 pl-4 pr-6 rounded-lg "
                onClick={() => {
                  printResult();
                }}
              >
                Print
              </button>
            </div>
          </div>
          <div ref={printSectionRef}>
            <div className="grid grid-cols-12 gap-5 unset-grid-on-print">
              {/* Table of content */}
              <div className="col-span-3 no-print flex-auto">
                <h1 className="mb-4 font-extrabold text-2xl">
                  Table of content
                </h1>
                <ol className="mt-6">
                  {state.sections?.map((section, index) => {
                    return (
                      <li className="mb-3 " key={index}>
                        <p className=" font-semibold">{section.title}</p>
                        <ul className=" list-disc pl-2">
                          <ol className=" list-inside">{section.subtitle}</ol>
                        </ul>
                      </li>
                    );
                  })}
                </ol>
              </div>

              {/* content section */}
              <div className="col-span-9  p-8  overflow-y-visible  gap-5 flex-auto ">
                <div
                  style={{
                    background: "url('/assets/images/report-bg.jpg')",
                    backgroundSize: "210mm 297mm",
                    backgroundRepeat: "repeat-y",
                    backgroundPosition: "top center",
                    objectFit: "cover",
                    padding: "100px  15px 15px 15px",
                    width: "210mm",
                    margin: "auto",
                  }}
                  className="full-width-on-print"
                >
                  <div
                    className="show-on-print hidden"
                    style={{
                      minHeight: "297mm",
                      paddingTop: "100px",
                    }}
                  >
                    <h1 className="mb-4 font-extrabold text-2xl">
                      Table of content
                    </h1>
                    <ol className="mt-6">
                      {state.sections?.map((section, index) => {
                        return (
                          <li className="mb-3 " key={section.id}>
                            <p className=" font-semibold">{section.title}</p>
                            <ul className=" list-disc pl-2">
                              <ol className=" list-inside">
                                {section.subtitle}
                              </ol>
                            </ul>
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                  {/* double columng row */}
                  <div className="">
                    {state.sections?.map((section, sectionIndex) => {
                      return (
                        <div
                          key={sectionIndex}
                          className=""
                          draggable
                          onDragStart={(e) => (dragItem.current = sectionIndex)}
                          onDragEnter={(e) =>
                            (dragOverItem.current = sectionIndex)
                          }
                          onDragEnd={handleSort}
                          onDragOver={(e) => e.preventDefault()}
                        >
                          <SectionContent
                            section={section}
                            sectionIndex={sectionIndex}
                            onHeadingTextChange={(text, index) => {
                              const updatedSection = state.sections[index];
                              updatedSection.title = text;
                              const findIndex = state.sections.findIndex(
                                (s) => s?.id === updatedSection.id
                              );
                              updateState({
                                sections: [
                                  ...state.sections.slice(0, findIndex),
                                  updatedSection,
                                  ...state.sections.slice(findIndex + 1),
                                ],
                              });
                            }}
                            onSubHeadingTextChange={(text, index) => {
                              const updatedSection = state.sections[index];
                              updatedSection.subtitle = text;
                              const findIndex = state.sections.findIndex(
                                (s) => s?.id === updatedSection.id
                              );
                              updateState({
                                sections: [
                                  ...state.sections.slice(0, findIndex),
                                  updatedSection,
                                  ...state.sections.slice(findIndex + 1),
                                ],
                              });
                            }}
                            onRemoveSection={(section) =>
                              removeSection(section)
                            }
                            onAddWidget={({
                              widgetTobeAddedIndex,
                              selectSectionIndex,
                            }: {
                              widgetTobeAddedIndex: number;
                              selectSectionIndex: number;
                            }) => {
                              updateState({
                                openWidgetsModal: true,
                                widgetToBeAddedIndex: widgetTobeAddedIndex,
                                selectSectionIndex: selectSectionIndex,
                              });
                            }}
                            onTextEditorUpdate={({
                              text,
                              widgetIndex,
                              sectionIndex,
                            }) => {
                              onTextEditorUpdate(
                                text,
                                widgetIndex,
                                sectionIndex
                              );
                            }}
                          />
                        </div>
                      );
                    })}
                    <button
                      className=" no-print inline-flex items-center gap-1 bg-white border border-gray-300 py-3 pl-4 pr-6 rounded-lg w-full justify-center mt-5"
                      onClick={() =>
                        updateState({
                          openColumnsModal: true,
                        })
                      }
                    >
                      <Image
                        src="/assets/images/icons/add.svg"
                        width={24}
                        height={24}
                        alt="add section"
                      />
                      New Section
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <ColumnSelectionModal
        onSectionAdded={onSectionAdded}
        open={state.openColumnsModal}
        setOpen={() => updateState({ openColumnsModal: false })}
      />
      <WidgetSelectionModal
        widgetToBeAddedIndex={state.widgetToBeAddedIndex}
        onSaveWidget={({
          type,
          data,
        }: {
          type: string;
          data: {
            chartData: EmissionHistoryWithData | null;
            text: string;
          };
        }) => onWidgetAdded({ type, data })}
        open={state.openWidgetsModal}
        setOpen={() => updateState({ openWidgetsModal: false })}
      />
    </main>
  );
}
