import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { SmartSettingsViewProps } from './SmartSettings.types';

const NativeView: React.ComponentType<SmartSettingsViewProps> =
  requireNativeViewManager('SmartSettings');

export default function SmartSettingsView(props: SmartSettingsViewProps) {
  return <NativeView {...props} />;
}
