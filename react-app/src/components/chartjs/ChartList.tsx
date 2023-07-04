import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { BarChart } from '@app/components';
import { DoughnutChart } from '@app/components';

const ChartList = () => {

  return (
    <>
      <div className="row">
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Daily tweets</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <BarChart />
            </div>
          </div>
        </div>

        <div className="col-4">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Sentiment Ratio</h3>
              <div className="card-tools">
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="collapse"
                  data-toggle="tooltip"
                  title="Collapse"
                >
                  <i className="fa fa-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-tool"
                  data-widget="remove"
                  data-toggle="tooltip"
                  title="Remove"
                >
                  <i className="fa fa-times" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <DoughnutChart />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartList;
