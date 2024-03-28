import AppButton from '@features/ui/AppButton';
import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { mapAuthCodeToMessage } from '@services/firebase';
import { db } from '@services/firebase/firebase';
import { FirestoreError, addDoc, collection } from 'firebase/firestore';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface Options {
  id: number;
  title: string;
  firstLetter: string;
}

interface CollectionForm {
  name: string;
  description: string;
  category: string;
}

const categories: Options[] = [
  { title: 'Books', firstLetter: 'O', id: 1 },
  { title: 'Coins', firstLetter: 'O', id: 2 },
  { title: 'Images', firstLetter: 'O', id: 3 },
];

export default function AddCollection() {
  const { handleSubmit, control, reset, getValues } = useForm({
    defaultValues: {
      name: '',
      description: '',
      category: '',
    },
  });

  const onSubmit: SubmitHandler<CollectionForm> = async (data) => {
    const selectedCategory = categories.find((category) => category.title === data.category);
    if (!selectedCategory) {
      console.error('Invalid category selected');
      return;
    }

    try {
      await addDoc(collection(db, 'users'), {
        name: data.name,
        description: data.description,
        category: data.category,
      });
      console.log('Your data has been submitted successfully!');
      reset();
    } catch (error) {
      if (error instanceof FirestoreError) {
        throw Error(mapAuthCodeToMessage(error.code));
      }
      throw Error('Something went wrong,please try again!');
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h1">Add New Collection.</Typography>
      <Box
        display="flex"
        flexDirection="column"
        component="form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        sx={{ width: '50%' }}
      >
        <Controller
          name="name"
          control={control}
          rules={{ required: 'Name of the Collection.' }}
          render={({ field, fieldState }) => (
            <TextField
              variant="standard"
              margin="normal"
              required
              id="name"
              label="Name"
              autoComplete="name"
              autoFocus
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: 3, mt: 0 }}
              {...field}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          rules={{ required: 'Description of the Collection.' }}
          render={({ field, fieldState }) => (
            <TextField
              variant="standard"
              margin="normal"
              required
              id="name"
              label="Description"
              autoComplete="name"
              autoFocus
              helperText={fieldState.error?.message}
              error={Boolean(fieldState.error)}
              sx={{ mb: 3, mt: 0 }}
              {...field}
            />
          )}
        />

        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              value={categories.find((category) => category.title === getValues('category')) || null}
              onChange={(_event, option) => field.onChange(option?.title || '')}
              id="grouped-demo"
              options={categories}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => <TextField {...params} label="Categories" />}
            />
          )}
        />

        <AppButton type="submit" sx={{ mt: 3 }}>
          Add Collection
        </AppButton>
      </Box>
    </Box>
  );
}
