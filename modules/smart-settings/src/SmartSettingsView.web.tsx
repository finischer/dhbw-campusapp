import * as React from 'react';

import { SmartSettingsViewProps } from './SmartSettings.types';

export default function SmartSettingsView(props: SmartSettingsViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
