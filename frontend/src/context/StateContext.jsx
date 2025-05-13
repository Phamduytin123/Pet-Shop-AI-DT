/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import authService from "../service/authService";
import { ReducerCases } from "../constants/ReducerCases";
import { getTokensFromStorage } from "../utils/storageUtils";
import Loading from "../components/Loading";
import { showErrorNotification } from "../utils/commonUtils";
export const StateContext = createContext();

export const StateProvider = ({ initialState, reducer, children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (state?.account) {
      setLoading(false);
      return;
    }

    const getAccountViaToken = async () => {
      try {
        const response = await authService.getAccountInfo();
        console.log(response.data);

        if (response.is_success) {
          dispatch({
            type: ReducerCases.SET_ACCOUNT_INFO,
            data: response.data,
          });
          setLoading(false);
        }
      } catch (error) {
        showErrorNotification(error.message);
      }
    };

    // Check if user is logged in
    const token = getTokensFromStorage();
    console.log("token: ", token);

    if (token) {
      getAccountViaToken();
      return;
    }

    setLoading(false);
  }, [state, dispatch]);

  // Show loading spinner while checking if user is logged in
  if (loading)
    return (
      <div style={{ height: "100vh", width: "100vw" }}>
        <Loading />
      </div>
    );

  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
