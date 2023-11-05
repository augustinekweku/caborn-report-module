"use client";
import { Dialog, Transition } from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useState, Fragment, useRef, useReducer, useEffect } from "react";
import { ColumnOne } from "./ColumnOne";
import { ColumnTwo } from "./ColumnTwo";
import { TextWidgetIcon } from "./TextWidgetIcon";
import { PieWidgetIcon } from "./PieWidgetIcon";
import { ImageWidgetIcon } from "./ImageWidgetIcon";
import ModalTemplate from "./shared/ModalTemplate";
import { EmissionSummaryParams } from "@/respositories/entity-repository";
import dayjs from "dayjs";
import DI from "@/di-container";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { EmissionHistoryData } from "@/types";
import { CHART_TYPE_DROPDOWN_OPTIONS } from "@/types/reports";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { set } from "mongoose";

export type WidgetData = {
  selectedChartType: string | null;
  selectedEmissionHistory: EmissionHistoryWithData | null;
  widgetType: string;
};

type PropTypes = {
  open: boolean;
  setOpen: (open: boolean) => void;
  cancelButtonRef?: React.RefObject<HTMLButtonElement>;
  onSaveWidget: ({
    type,
    data,
  }: {
    type: string;
    data: {
      chartData: EmissionHistoryWithData | null;
      text: string;
    };
  }) => void;
  widgetToBeAddedIndex: number | null;
};

export type EmissionHistoryWithData = {
  label: string;
  value: EmissionHistoryData;
};

type StateType = {
  isLoading: boolean;
  emissionHistory?: EmissionHistoryWithData[];
};

type FormType = {
  widgetType: "text" | "chart" | "image" | null;
  selectedChartType: string;
  selectedEmissionHistory: EmissionHistoryWithData | null;
};

const InitialValues: FormType = {
  widgetType: null,
  selectedChartType: "",
  selectedEmissionHistory: null,
};

export const WidgetSelectionModal = ({
  open,
  setOpen,
  cancelButtonRef,
  onSaveWidget,
}: PropTypes) => {
  const [selectedColumn, setColumn] = useState<number>(0);
  // const cancelButtonRef = useRef(null)
  const reportModule = useSelector(
    (state: RootState) => state.reportModule.report
  );
  const [state, updateState] = useReducer(
    (state: StateType, newState: Partial<StateType>) => {
      const updatedState = { ...state, ...newState };

      return updatedState;
    },
    {
      isLoading: false,
      emissionHistory: [],
    }
  );

  const FormSchema = yup.object({
    widgetType: yup.string().required("Please select a widget"),
    selectedChartType: yup
      .string()
      .when("widgetType", ([widgetType], selectedChartType) => {
        if (widgetType === "chart") {
          return yup.string().required("Please select a chart type");
        }
        return yup.string().nullable();
      }),

    selectedEmissionHistory: yup
      .string()
      .when("widgetType", ([widgetType], selectedEmissionHistory) => {
        if (widgetType === "chart") {
          return yup
            .object()
            .nonNullable()
            .label("Emission history")
            .required("Please select an emission history");
        }
        return yup.array().nullable();
      }),
  });

  async function getEmissionSummary(params?: EmissionSummaryParams) {
    try {
      updateState({ isLoading: true });

      // default start of the year to end of the year
      const defaultParams = {
        start_date: dayjs().startOf("year").format("YYYY-MM-DD"),
        end_date: dayjs().endOf("year").format("YYYY-MM-DD"),
      } as EmissionSummaryParams;

      const res = await DI.entityService.getEmissionSummary(
        reportModule?.entities[0],
        params ?? defaultParams
      );

      const emissionHistoriesWithData = res.data?.emissionsHistories
        .filter((history) => history.data.length)
        .map((history: EmissionHistoryData) => {
          return {
            label: history.name,
            value: history,
          };
        });
      updateState({ emissionHistory: emissionHistoriesWithData ?? [] });
    } finally {
      updateState({ isLoading: false });
    }
  }

  function saveWidget(values: FormType) {
    if (values.widgetType === "text") {
      onSaveWidget({
        type: values.widgetType as string,
        data: {
          chartData: values.selectedEmissionHistory,
          text: "",
        },
      });
    } else {
      onSaveWidget({
        type: values.selectedChartType as string,
        data: {
          chartData: values.selectedEmissionHistory,
          text: "",
        },
      });
    }
    initState();
  }

  const onSubmit = async (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    saveWidget(values);
  };

  useEffect(() => {
    if (reportModule?.entities[0]) {
      getEmissionSummary();
    }
  }, [reportModule?.entities?.length]);

  function initState() {
    updateState({
      isLoading: false,
    });
  }

  return (
    <>
      {open ? (
        <ModalTemplate isOpen={open} size="lg">
          <Formik
            initialValues={InitialValues}
            validationSchema={FormSchema}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              isSubmitting,
              setFieldValue,
            }) => (
              <Form>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Add widget
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Select a widget to add
                        </p>

                        {/* Wdigets */}

                        <div className="grid grid-cols-12 gap-5 mt-7">
                          <div className="col-span-4">
                            <TextWidgetIcon
                              selectedWidgetIcon={values.widgetType as string}
                              onClick={() => {
                                setFieldValue("widgetType", "text");
                              }}
                            />
                          </div>
                          <div className="col-span-4">
                            <PieWidgetIcon
                              selectedWidgetIcon={values.widgetType as string}
                              onClick={() => {
                                setFieldValue("widgetType", "chart");
                              }}
                            />
                          </div>

                          <div className="col-span-4 hidden">
                            <ImageWidgetIcon
                              selectedWidgetIcon={values.widgetType as string}
                              onClick={() => {}}
                            />
                          </div>
                        </div>
                        <p className="text-red-500 mt-3">
                          {" "}
                          {errors.widgetType &&
                            touched.widgetType &&
                            errors.widgetType}{" "}
                        </p>
                        {values.widgetType === "chart" ? (
                          <div className="space-y-12">
                            <div className="border-b border-gray-900/10 pb-12">
                              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                  <label
                                    htmlFor="first-name"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Emission histories
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      id="country"
                                      name="country"
                                      autoComplete="country-name"
                                      value={
                                        values.selectedEmissionHistory?.label ??
                                        ""
                                      }
                                      onChange={(e) => {
                                        const selectedEmissionHistory =
                                          state.emissionHistory?.find(
                                            (
                                              history: EmissionHistoryWithData
                                            ) =>
                                              history.label === e.target.value
                                          ) ?? null;
                                        setFieldValue(
                                          "selectedEmissionHistory",
                                          selectedEmissionHistory
                                        );
                                      }}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                      <option value="" disabled>
                                        Select one option
                                      </option>
                                      {state.emissionHistory?.map(
                                        (
                                          history: EmissionHistoryWithData,
                                          index: number
                                        ) => (
                                          <option
                                            key={index}
                                            value={history.label}
                                          >
                                            {history.label}
                                          </option>
                                        )
                                      )}
                                    </select>
                                    <p className="text-red-500 mt-2">
                                      {" "}
                                      {errors.selectedEmissionHistory &&
                                        touched.selectedEmissionHistory &&
                                        errors.selectedEmissionHistory}
                                    </p>
                                  </div>
                                </div>

                                <div className="col-span-full">
                                  <label
                                    htmlFor="about"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Chart type
                                  </label>
                                  <div className="mt-2">
                                    <select
                                      id="selectedChartType"
                                      name="selectedChartType"
                                      autoComplete="selectedChartType-name"
                                      value={values.selectedChartType ?? ""}
                                      onChange={(e) => {
                                        setFieldValue(
                                          "selectedChartType",
                                          e.target.value
                                        );
                                      }}
                                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    >
                                      <option value="" disabled>
                                        Select one option
                                      </option>
                                      {CHART_TYPE_DROPDOWN_OPTIONS.map(
                                        (option, index) => (
                                          <option
                                            key={index}
                                            value={option.value}
                                          >
                                            {option.label}
                                          </option>
                                        )
                                      )}
                                    </select>
                                    <p className="text-red-500 mt-2">
                                      {" "}
                                      {errors.selectedChartType ||
                                        touched.selectedChartType}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black sm:ml-3 sm:w-auto"
                    // onClick={() => saveWidget()}
                    // disabled={!state.isFormValid}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </ModalTemplate>
      ) : null}
    </>
  );
};
