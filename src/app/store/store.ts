import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@features/auth/store/AuthSlice';

import { rtkQueryErrorLogger } from './middleware/errorMiddleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (buildGetDefaultMiddleware) => buildGetDefaultMiddleware().concat(rtkQueryErrorLogger),
});
