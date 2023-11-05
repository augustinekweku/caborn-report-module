import { ReportWidget, ReportWidgetType, WidgetType } from "@/types/reports";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
} from "recharts";

import React, { useEffect, useMemo } from "react";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";

type PropTypes = {
  widget: ReportWidget;
  onTextEditorUpdate: (value: string) => void;
  widgetsLength: number;
};

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
];

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

const ChartWidget = ({
  widget,
  onTextEditorUpdate,
  widgetsLength,
}: PropTypes) => {
  const [value, setValue] = React.useState(widget.data.text);
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <>
      <div className="w-full h-full  flex justify-end">
        {widget.type == WidgetType.TEXT ? (
          <div className="w-full h-full">
            <ReactQuill
              theme="snow"
              value={widget.data.text}
              modules={modules}
              formats={formats}
              onChange={(e) => {
                // setValue(e);
                onTextEditorUpdate(e);
              }}
            />
          </div>
        ) : null}

        {widget.type !== WidgetType.TEXT ? (
          <ResponsiveContainer width="100%" height="80%" className={"h-full"}>
            <>
              {widget.type === WidgetType.BAR_CHART ? (
                <BarChart
                  width={widgetsLength > 1 ? 302 : 600}
                  height={300}
                  data={widget.data.chartData?.value?.data}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="emissions"
                    fill="#8884d8"
                    activeBar={<Rectangle fill="pink" stroke="blue" />}
                  />
                </BarChart>
              ) : null}
              {widget.type === WidgetType.LINE_CHART ? (
                <LineChart
                  width={widgetsLength > 1 ? 302 : 600}
                  height={300}
                  data={widget.data.chartData?.value?.data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis dataKey="emissions" />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="emissions"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              ) : null}
              {widget.type === WidgetType.PIE_CHART ? (
                <>
                  <PieChart width={400} height={400}>
                    <Pie
                      dataKey="emissions"
                      startAngle={360}
                      endAngle={0}
                      data={widget.data.chartData?.value?.data}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      label
                    />
                  </PieChart>
                </>
              ) : null}
            </>
          </ResponsiveContainer>
        ) : null}
      </div>
    </>
  );
};

export default ChartWidget;
