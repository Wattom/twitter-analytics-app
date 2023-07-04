import React from 'react';
import {Link} from 'react-router-dom';

export interface InfoBoxProps {
  type: 'info' | 'success' | 'warning' | 'danger' | 'secondary';
  icon?: string;
  count: number;
  title: string;
}

const InfoBox = ({
  type = 'info',
  icon = 'comment',
  count,
  title
}: InfoBoxProps) => {

  return (
    <div className="info-box">
      <span className={`info-box-icon bg-${type}`}>
        <i className={`far fa-${icon || 'comment'}`} />
      </span>
      <div className="info-box-content">
        <span className="info-box-text">{title}</span>
        <span className="info-box-number">{count}</span>
      </div>
    </div>
  );
};

export default InfoBox;
