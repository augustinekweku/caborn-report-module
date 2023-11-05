import { RootState } from "@/store";
import { ReportSection } from "@/types/reports";
import { on } from "events";
import React from "react";
import { useSelector } from "react-redux";
import { RemoveColumnButton } from "./svg/RemoveColumnButton";
import { PluseIcon } from "./svg/PlusIcon";
import ChartWidget from "./ChartWidget";
import { SwitchColumnButton } from "./svg/SwitchColumnButton";

type PropTypes = {
  section: ReportSection;
  sectionIndex: number;
  onRemoveSection: (section: ReportSection) => void;
  onTextEditorUpdate: ({
    text,
    sectionIndex,
    widgetIndex,
  }: {
    text: string;
    sectionIndex: number;
    widgetIndex: number;
  }) => void;

  onHeadingTextChange: (text: string, sectionIndex: number) => void;

  onSubHeadingTextChange: (text: string, sectionIndex: number) => void;
  onAddWidget: ({
    widgetTobeAddedIndex,
    selectSectionIndex,
  }: {
    widgetTobeAddedIndex: number;
    selectSectionIndex: number;
  }) => void;
};
const SectionContent = ({
  section,
  sectionIndex,
  onRemoveSection,
  onTextEditorUpdate,
  onHeadingTextChange,
  onSubHeadingTextChange,
  onAddWidget,
}: PropTypes) => {
  const reportModule = useSelector(
    (state: RootState) => state.reportModule.report
  );

  return (
    <div className="page-break mb-8 " draggable={false}>
      <div className="flex flex-col  mb-2" draggable={false}>
        <input
          style={{
            background: "transparent",
            fontSize: reportModule?.headingFontSize ?? 24,
            color: reportModule?.headingColor
              ? "#" + reportModule?.headingColor
              : "#000",
            fontFamily: reportModule?.headingFontName ?? "inherit",
          }}
          type="text"
          value={section.title}
          onChange={(e) => {
            onHeadingTextChange(e.target.value, sectionIndex);
          }}
        />
        <input
          style={{
            background: "transparent",
            fontSize: reportModule?.subheadingFontSize ?? 16,
            color: reportModule?.subheadingsColor
              ? "#" + reportModule?.subheadingsColor
              : "#000",
            fontFamily: reportModule?.subheadingFontName ?? "inherit",
          }}
          type="text"
          value={section.subtitle}
          onChange={(e) => {
            onSubHeadingTextChange(e.target.value, sectionIndex);
          }}
        />
      </div>
      <div className="grid grid-flow-col gap-5 mb-3 bg-[#f7f7f776] relative">
        <span className="cursor-pointer absolute top-3 right-3 z-30 shadow-md no-print">
          <div
            onClick={() => {
              onRemoveSection(section);
            }}
          >
            <RemoveColumnButton />
          </div>
        </span>
        {/* if there are no widgets */}
        {Array?.from(
          {
            length: section.type - section.widgets.length,
          },
          (_, index) => (
            <React.Fragment key={index + "ws"}>
              <div
                className=" min-h-[320px] w-full justify-center items-center flex  no-print"
                draggable={false}
              >
                <span
                  onClick={() => {
                    onAddWidget({
                      widgetTobeAddedIndex: index,
                      selectSectionIndex: sectionIndex,
                    });
                  }}
                  className="m-auto flex items-center flex-col gap-4 cursor-pointer"
                >
                  <PluseIcon />
                  Add Widget
                </span>
              </div>
            </React.Fragment>
          )
        )}

        {/* if there are widgets */}

        {
          // @ts-ignore
          section?.widgets?.map((widget, index) => {
            return (
              <div
                key={index}
                className=" min-h-[320px] w-full p-3"
                draggable={false}
              >
                <div className="gap-4 w-full h-full ">
                  <ChartWidget
                    onTextEditorUpdate={(text: string) => {
                      onTextEditorUpdate({
                        text,
                        sectionIndex,
                        widgetIndex: index,
                      });

                      onTextEditorUpdate({
                        text,
                        sectionIndex,
                        widgetIndex: index,
                      });
                    }}
                    widget={widget}
                    widgetsLength={section.widgets.length}
                  />
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default SectionContent;
