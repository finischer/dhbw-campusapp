import { View, TextInput, StyleSheet } from "react-native";
import React, { useRef, useState } from "react";
import Input from "../Input";
import Icon from "../Icon";
import { useMetadata } from "../../hooks/useMetadata";
import { ISearchbarProps } from "./searchbar.types";
import { searchbarStyles } from "./searchbar.styles";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import TouchableOpacity from "../TouchableOpacity";

const Searchbar: React.FC<ISearchbarProps> = ({ onSearch, searchString }) => {
  const { colors } = useMetadata();
  const searchInputRef = useRef<TextInput>(null);
  const [hasInput, setHasInput] = useState<boolean>(searchString.length > 0);

  const handleOnSearch = (text: string) => {
    onSearch(text);
    setHasInput(text.length > 0);
  };

  const clearInput = () => {
    onSearch("");
    searchInputRef.current?.clear();
    setHasInput(false);
  };

  const localSearchBarStyles = StyleSheet.create({
    container: {
      borderBottomColor: colors.secondary,
    },
    clearIconContainer: {
      backgroundColor: colors.secondary,
      opacity: 0.3,
    },
  });

  return (
    <View style={[searchbarStyles.container, localSearchBarStyles.container]}>
      {/* Search Icon */}
      <Icon
        source="feather"
        name="search"
        size={21}
        onClick={() => searchInputRef.current?.focus()}
      />

      {/* Search Input View */}
      <View style={searchbarStyles.searchInputContainer}>
        <Input
          ref={searchInputRef}
          label="Suchen"
          value={searchString}
          floatingLabel={false}
          noBorder
          autoCorrect={false}
          onChangeText={handleOnSearch}
          autoFocus={!!searchString} // Workaround for bug that Input lose focus if a filtered section has no data
        />
      </View>

      {/* Clear Icon View */}
      {hasInput && (
        <TouchableOpacity
          style={[searchbarStyles.clearIconContainerWrapper]}
          onPress={clearInput}
        >
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(100)}
            style={[
              searchbarStyles.clearIconContainer,
              localSearchBarStyles.clearIconContainer,
            ]}
          >
            <Icon
              source="feather"
              name="x"
              size={12}
              clickable={false}
              color={colors.primary}
            />
          </Animated.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Searchbar;
