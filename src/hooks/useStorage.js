import AsyncStorage from "@react-native-async-storage/async-storage";

const useStorage = () => {
  //Buscar itens salvos
  const getItem = async (key) => {
    try {
      const passwords = await AsyncStorage.getItem(key);
      return JSON.parse(passwords) || [];
    } catch (error) {
      console.log("Erro ao buscar!", error);
      return [];
    }
  };

  //Salvar um item no storage
  const saveItem = async (key, value) => {
    try {
      //busca os items
      let passwords = await getItem(key);

      //adiciona os items
      passwords.push(value);

      //salva o item na lista atualizada com esse item a mais
      await AsyncStorage.setItem(key, JSON.stringify(passwords));
    } catch (error) {
      console.log("Erro ao salvar.", error);
    }
  };

  //Remover algo do storage
  const removeItem = async (key, item) => {
    try {
      //busca os items
      let passwords = await getItem(key);

      //filtra para tirar o item que quer remover
      let myPasswords = passwords.filter((password) => {
        return password !== item;
      });

      //atualizando storage
      await AsyncStorage.setItem(key, JSON.stringify(myPasswords));
      return myPasswords;
    } catch (error) {
      console.log("Erro ao deletar", error);
    }
  };

  return {
    getItem,
    saveItem,
    removeItem,
  };
};

export default useStorage;
