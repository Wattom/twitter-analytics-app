import React, { useState, useEffect } from 'react';
import axios, { AxiosResponse } from 'axios';

const TweetList = () => {
  const [positive, setPositive] = useState([]);
  const [negative, setNegative] = useState([]);
  const [neutral, setNeutral] = useState([]);

  useEffect(() => {
    try {
      axios.get(`/api/tweets`)
        .then(res => {
          setPositive(res.data.positive);
          setNegative(res.data.negative);
          setNeutral(res.data.neutral);
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
        <div className="col-lg-4 col-12">
          <div className="card card-info direct-chat direct-chat-info">
            <div className="card-header">
              <h3 className="card-title">Positive</h3>
              <div className="card-tools">
                <span
                  data-toggle="tooltip"
                  title="3 New Messages"
                  className="badge badge-light"
                >
                  {positive.length}
                </span>
                <button type="button" className="btn btn-tool" data-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="direct-chat-messages">
                {positive?.map((item: any) => (
                  <div className="direct-chat-msg" key={item.TweetId}>
                    <div className="direct-chat-infos clearfix">
                      <span className="direct-chat-name float-left">
                        {item.TweetedBy}
                      </span>
                      <span className="direct-chat-timestamp float-right">
                        {item.CreatedAtIso}
                      </span>
                    </div>
                    <img
                      className="direct-chat-img"
                      src="/img/default-profile.png"
                      alt="message user image" />
                    <div className="direct-chat-text">
                      {
                        (() => {
                          let sentencelist = [];
                          for (let i = 0; i < item.sentences.length; i++) {
                            sentencelist.push(<span className={item.sentences[i].sentiment} key={i}>{item.sentences[i].text}</span>);
                          }
                          return (sentencelist)
                        })()
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-12">
          <div className="card card-success direct-chat direct-chat-success">
            <div className="card-header">
              <h3 className="card-title">Neutral</h3>
              <div className="card-tools">
                <span
                  data-toggle="tooltip"
                  title="3 New Messages"
                  className="badge badge-light"
                >
                  {neutral.length}
                </span>
                <button type="button" className="btn btn-tool" data-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="direct-chat-messages">
                {neutral?.map((item: any) => (
                  <div className="direct-chat-msg" key={item.TweetId}>
                    <div className="direct-chat-infos clearfix">
                      <span className="direct-chat-name float-left">
                        {item.TweetedBy}
                      </span>
                      <span className="direct-chat-timestamp float-right">
                        {item.CreatedAtIso}
                      </span>
                    </div>
                    <img
                      className="direct-chat-img"
                      src="/img/default-profile.png"
                      alt="message user image" />
                    <div className="direct-chat-text">
                      {
                        (() => {
                          let sentencelist = [];
                          for (let i = 0; i < item.sentences.length; i++) {
                            sentencelist.push(<span className={item.sentences[i].sentiment} key={i}>{item.sentences[i].text}</span>);
                          }
                          return (sentencelist)
                        })()
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-footer">
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-12">
          <div className="card card-danger direct-chat direct-chat-danger">
            <div className="card-header">
              <h3 className="card-title">Negative</h3>
              <div className="card-tools">
                <span
                  data-toggle="tooltip"
                  title="3 New Messages"
                  className="badge badge-light"
                >
                  {negative.length}
                </span>
                <button type="button" className="btn btn-tool" data-widget="collapse">
                  <i className="fas fa-minus" />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="direct-chat-messages">
                {negative?.map((item: any) => (
                  <div className="direct-chat-msg" key={item.TweetId}>
                    <div className="direct-chat-infos clearfix">
                      <span className="direct-chat-name float-left">
                        {item.TweetedBy}
                      </span>
                      <span className="direct-chat-timestamp float-right">
                        {item.CreatedAtIso}
                      </span>
                    </div>
                    <img
                      className="direct-chat-img"
                      src="/img/default-profile.png"
                      alt="message user image" />
                    <div className="direct-chat-text">
                      {
                        (() => {
                          let sentencelist = [];
                          for (let i = 0; i < item.sentences.length; i++) {
                            sentencelist.push(<span className={item.sentences[i].sentiment} key={i}>{item.sentences[i].text}</span>);
                          }
                          return (sentencelist)
                        })()
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="card-footer">
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TweetList;
