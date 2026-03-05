import React, { useContext, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { AgCharts } from "ag-charts-react";
import { CurrentUserContext } from '../CurrentUserContext';

import {
  LegendModule,
  ModuleRegistry,
  PieSeriesModule,
} from "ag-charts-community";

ModuleRegistry.registerModules([LegendModule, PieSeriesModule]);

export default function TransactionChart() {
    const { currentUser, transactions } = useContext(CurrentUserContext);
    const [options, setOptions] = useState({
    data: [],
      title: {
      text: "Overall Expenses by Category",
    },
    series: [
      {
        type: "pie",
        angleKey: "amount",
        legendItemKey: "category",
      },
    ],
  });

  async function getData () {
    try {
        const response = await fetch(`${process.env.PROD_URL}/be-et/transactions/all/${currentUser.id}`);
        const data = await response.json();
        console.log(data);
        setOptions({...options, data: data})
        return data;
    } catch (err) {
        console.log(err);
    }
  }


  useEffect(() => {
    getData();
  }, [transactions])

  return <AgCharts options={options} />;
};

// const root = createRoot(document.getElementById("root"));
// root.render(<ChartExample />);