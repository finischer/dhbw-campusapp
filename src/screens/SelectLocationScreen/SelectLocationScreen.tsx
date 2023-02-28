import React from 'react'
import GlobalBody from '../../components/GlobalBody'
import RegularRowItem from '../../components/RegularRowItem'
import { useMetadata } from '../../hooks/useMetadata'
import { DHBWLocation } from '../../hooks/useMetadata/useMetadata.types'

const DHBW_LOCATIONS: DHBWLocation[] = [
    "mannheim", "karlsruhe"
]

const SelectLocationScreen = () => {
    const { changeDhbwLocation } = useMetadata();

    const handleItemClick = (newDhbwLocation: DHBWLocation) => {
        changeDhbwLocation(newDhbwLocation);
    }

    return (
        <GlobalBody>
            {DHBW_LOCATIONS.map((location: DHBWLocation) => (
                <RegularRowItem key={location} onClick={() => handleItemClick(location)}>{location}</RegularRowItem>
            ))}
        </GlobalBody>
    )
}

export default SelectLocationScreen