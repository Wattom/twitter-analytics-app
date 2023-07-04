import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';
import { InfoBox } from '@app/components';

const InfoBoxList = () => {
  const [positive, setPositive] = useState(0);
  const [negative, setNegative] = useState(0);
  const [neutral, setNeutral] = useState(0);

  useEffect(() => {
    try {
      axios.get(`/api/sentimentratio`)
        .then(res => {
          for (let dataObj of res.data) {
            if (dataObj.sentiment == "positive") {
              setPositive(dataObj.NumberOfPosts);
            } else if (dataObj.sentiment == "negative") {
              setNegative(dataObj.NumberOfPosts);
            } else if (dataObj.sentiment == "neutral") {
              setNeutral(dataObj.NumberOfPosts);
            }
          }
        })
    } catch (e: any) {
      if (e.response && e.response.status === 400) {
        console.log('400 Error!!');
        console.log(e.message);
      }
    }
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-6">
          <InfoBox type='secondary' title="All Tweets" count={positive+neutral+negative} />
        </div>
        <div className="col-lg-3 col-6">
          <InfoBox type='info' title="Positive" count={positive} icon="smile"/>
        </div>
        <div className="col-lg-3 col-6">
          <InfoBox type='success' title="Neutral" count={neutral} icon="meh"/>
        </div>
        <div className="col-lg-3 col-6">
          <InfoBox type='danger' title="Negative" count={negative} icon="frown"/>
        </div>
      </div>
    </>
  );
};

export default InfoBoxList;
