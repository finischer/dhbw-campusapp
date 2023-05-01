import { FlatList } from 'react-native'
import React from 'react'
import { FinaleLicenseType, LicenseType } from './licensesScreen.types';
import GlobalBody from '../../components/GlobalBody';
import RegularRowItem from '../../components/RegularRowItem';
import useAlert from '../../hooks/useAlert';
import { SPACING } from '../../constants/layout';
import { sortArrayByKey } from '../../utilities/sortFunctions';

const LicensesScreen = () => {
    const { openLink } = useAlert();
    const licenses: { [id: string]: LicenseType } = require('../../../licenses.json');

    const numberRegex = /\d+(\.\d+)*/;
    const atRegex = /(?:@)/gi;

    const finalLicenses: FinaleLicenseType[] = Object.keys(licenses).map((libraryName: string) => {
        const version = libraryName.match(numberRegex);
        const nameWithoutVersion = libraryName.replace(atRegex, '').replace(version ? version[0] : '', '');
        const license = licenses[libraryName]

        return {
            libraryName: nameWithoutVersion,
            version: version ? version[0] : '',
            licenses: license["licenses"],
            licenseUrl: license["licenseUrl"],
            repositoryUrl: license["repository"]
        }
    });

    return (
        <GlobalBody noVerticalPadding>
            <FlatList
                data={sortArrayByKey(finalLicenses, "libraryName" as keyof FinaleLicenseType) as FinaleLicenseType[]}
                renderItem={({ item, index }: { item: FinaleLicenseType, index: number }) => (
                    <RegularRowItem key={index} subtitle={item.version} rightIconSource="feather" rightIcon='external-link' onClick={() => openLink(item.repositoryUrl)}>{item.libraryName}</RegularRowItem>
                )}
                contentContainerStyle={{ paddingBottom: SPACING.md }}
            />
        </GlobalBody>
    )
}

export default LicensesScreen