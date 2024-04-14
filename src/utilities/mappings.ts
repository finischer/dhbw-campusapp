import { DHBWLocation } from './../hooks/useMetadata/useMetadata.types';

type DHBWLocationMap = {
    [index in DHBWLocation]: string
}

export const DHBW_NAME: DHBWLocationMap = {
    "karlsruhe": "Karlsruhe",
    "mannheim": "Mannheim"
}