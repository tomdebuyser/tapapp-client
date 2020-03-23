import React, { FC } from 'react';
import classnames from 'classnames';
import './segmentedControl.scss';

interface SegmentedControlItem {
  label?: string;
  type: string;
}

interface Props {
  activeItemType: string;
  items: SegmentedControlItem[];
  onChange: (type: string) => void;
}

const SegmentedControl: FC<Props> = ({ items, activeItemType, onChange }) => (
  <div className="segmented-control">
    {items.map(item => (
      <button
        className={classnames('plain', { active: item.type === activeItemType })}
        key={item.type}
        onClick={() => onChange(item.type)}
      >
        {item.label || item.type}
      </button>
    ))}
  </div>
);

export default SegmentedControl;
