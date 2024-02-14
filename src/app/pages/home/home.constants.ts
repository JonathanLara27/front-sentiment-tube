import { AgChartOptions } from 'ag-charts-community';
import { getData, getData2, getData3 } from "../../components/SimpleDoughnut/data";
export const OPTIONS_COMMENTS : AgChartOptions = {
    data: getData(),
    title: {
      text: "Comentarios",
    },
    series: [
      {
        type: "pie",
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.7,
      },
    ],
  };
export const OPTIONS_POSITIVE : AgChartOptions = {
    data: getData2(),
    title: {
      text: "Descatadas +",
    },
    series: [
      {
        type: "pie",
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.7,
      },
    ],
  };
export const OPTIONS_NEGATIVE : AgChartOptions = {
    data: getData3(),
    title: {
      text: "Transcripción emociones",
    },
    series: [
      {
        type: "pie",
        calloutLabelKey: "asset",
        angleKey: "amount",
        innerRadiusRatio: 0.7,
      },
    ],
  };