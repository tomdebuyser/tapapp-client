import React, { FC } from 'react';
import classnames from 'classnames';
import './segmentedControl.scss';

interface SegmentedControlItem {
  label?: string;
  type: string;
}

interface Props {
  activeItemType: string;
  isLarge?: boolean;
  items: SegmentedControlItem[];
  onChange: (type: string) => void;
}

const SegmentedControl: FC<Props> = ({ items, activeItemType, onChange, isLarge }) => (
  <div className={classnames('segmented-control', { large: isLarge })}>
    {items.map(item => (
      <button
        className={classnames('plain', { active: item.type === activeItemType })}
        key={item.type}
        onClick={() => onChange(item.type)}
        type="button"
      >
        {item.label || item.type}
      </button>
    ))}
  </div>
);

SegmentedControl.defaultProps = {
  isLarge: false,
};

export default SegmentedControl;
