import React, { useEffect, useContext } from "react";
import { Pressable, Text, TextInput, View, StyleSheet } from "react-native";
import { Switch } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Icons from "../common/Icons";
import Modal from "../common/Modal";
import useDebounce from "../../hooks/useDebounce";
import useDisclosure from "../../hooks/useDisclosure";
import { Context } from "../../src/context/context";

interface FilterProps {
  mainMinPrice: number;
  mainMaxPrice: number;
  handleChangeRoute: (params: any) => void;
}

const Filter: React.FC<FilterProps> = ({
  mainMinPrice,
  mainMaxPrice,
  handleChangeRoute,
}) => {
  const [isFilters, filtersHandlers] = useDisclosure();
  const insets = useSafeAreaInsets();
  const { dispatch } = useContext(Context);

  const debouncedMinPrice = useDebounce(mainMinPrice, 1200);
  const debouncedMaxPrice = useDebounce(mainMaxPrice, 1200);

  const loadFilters = (price?: string) => {
    dispatch({ type: "loadFilters", payload: { price } });
  };

  const resetFilter = (maxPrice: string, minPrice: string) => {
    dispatch({ type: "resetFilter", payload: { maxPrice, minPrice } });
  };

  const updateFilter = (name: string, value: boolean | string) => {
    dispatch({ type: "updateFilter", payload: { name, value } });
  };

  const handlefilter = (props: {
    name: string;
    value: boolean | string;
    type: string;
  }) => {
    const { name, value, type } = props;
    const filterValue = value;
    updateFilter(name, filterValue);

    if (type === "checkbox") handleChangeRoute({ [name]: filterValue });
  };

  const handleResetFilters = () => {
    handleChangeRoute({ inStock: "", discount: "", price: "" });

    resetFilter(String(mainMaxPrice), String(mainMinPrice));

    if (filtersHandlers.close) filtersHandlers.close();
  };

  const canReset =
    mainMinPrice !== debouncedMinPrice ||
    mainMaxPrice !== debouncedMaxPrice;

  useEffect(() => {
    loadFilters(
      mainMaxPrice && mainMinPrice ? `${mainMinPrice}-${mainMaxPrice}` : ""
    );
  }, [mainMaxPrice, mainMinPrice, dispatch]);

  useEffect(() => {
    if (
      Number(debouncedMinPrice) &&
      mainMinPrice !== Number(debouncedMinPrice)
    ) {
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      });
    }
  }, [debouncedMinPrice]);

  useEffect(() => {
    if (
      Number(debouncedMaxPrice) &&
      mainMaxPrice !== Number(debouncedMaxPrice)
    ) {
      handleChangeRoute({
        price: `${debouncedMinPrice}-${debouncedMaxPrice}`,
      });
    }
  }, [debouncedMaxPrice]);

  useEffect(() => {
    if (filtersHandlers.close) filtersHandlers.close();
  }, [debouncedMaxPrice, debouncedMinPrice]);

  return (
    <>
      <View style={styles.container}>
        <Pressable onPress={filtersHandlers.open} style={styles.filterButton}>
          <Icons.Ionicons name="filter" size={16} color="#6B7280" />
          <Text style={styles.filterButtonText}>Filtrar</Text>
        </Pressable>
      </View>
      <Modal
        isShow={isFilters}
        onClose={filtersHandlers.close}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onBackdropPress={filtersHandlers.close}
        closeOnClickOverlay={true}
      >
        <Modal.Content
          onClose={filtersHandlers.close}
          style={{
            paddingTop: insets.top,
            flex: 1,
            width: "80%",
            paddingHorizontal: 20,
            marginLeft: "15%",
            backgroundColor: "#fff",
          }}
        >
          <Modal.Header onClose={filtersHandlers.close}>Filtro</Modal.Header>
          <Modal.Content onClose={filtersHandlers.close}>
            {" "}
            <View style={styles.resetButtonContainer}>
              <Pressable disabled={!canReset} onPress={handleResetFilters}>
                <Text style={styles.resetButtonText}>Limpar Filtros</Text>
              </Pressable>
            </View>
            <View style={styles.filterOptionsContainer}>      
              {/**
               * <View style={styles.filterOption}>
                <Text style={styles.filterOptionText}>
                  Apenas itens em estoque
                </Text>
                <Switch
                  value={filters.inStock}
                  onValueChange={(value) =>
                    handlefilter({ name: "inStock", type: "checkbox", value })
                  }
                />
              </View>
              <View style={styles.filterOption}>
                <Text style={styles.filterOptionText}>
                  Apenas itens com desconto
                </Text>
                <Switch
                  value={filters.discount}
                  onValueChange={(value) =>
                    handlefilter({ name: "discount", type: "checkbox", value })
                  }
                />
              </View> */}

              <View style={styles.priceRangeContainer}>
                <Text style={styles.priceRangeText}>Faixa de preço</Text>
                <View style={styles.priceInputsContainer}>
                  <Text style={styles.priceInputLabel}>De</Text>
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={String(mainMinPrice || 0)}
                    onChangeText={(value) =>
                      handlefilter({ name: "minPrice", type: "input", value })
                    }
                  />
                  <Text style={styles.currencyText}>€</Text>
                </View>
                <View style={styles.priceInputsContainer}>
                  <Text style={styles.priceInputLabel}>Para</Text>
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={String(mainMaxPrice || 0)}
                    onChangeText={(value) =>
                      handlefilter({ name: "maxPrice", type: "input", value })
                    }
                  />
                  <Text style={styles.currencyText}>€</Text>
                </View>
              </View>
            </View>
          </Modal.Content>
        </Modal.Content>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  filterButtonText: {
    fontSize: 16,
    color: "#6B7280",
  },
  resetButtonContainer: {
    justifyContent: "flex-end",
    marginVertical: 10,
  },
  resetButtonText: {
    fontSize: 14,
    color: "#3B82F6",
  },
  filterOptionsContainer: {
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
    paddingTop: 10,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
  },
  filterOptionText: {
    fontWeight: "bold",
    color: "#374151",
    width: "75%",
  },
  priceRangeContainer: {
    paddingTop: 10,
  },
  priceRangeText: {
    fontWeight: "bold",
    color: "#374151",
  },
  priceInputsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  priceInputLabel: {
    fontSize: 16,
  },
  priceInput: {
    width: "70%",
    paddingHorizontal: 5,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#D1D5DB",
    outlineWidth: 0,
  },
  currencyText: {
    fontSize: 16,
  },
});

export default Filter;
