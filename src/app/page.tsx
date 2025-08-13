'use client'
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography
} from "@mui/material";
import styles from "./page.module.css";
import useHome from "./page.hook";
import { Controller } from "react-hook-form";

export default function Home() {
  const {
    listCountry,
    control,
    listHarbor,
    listProduct,
    isLoadingCountry,
    isLoadingHarbor,
    isLoadingProduct,
    onOpenHarbor,
    onOpenProduct,
    watch,
    setValue,
    theme,
    open,
    handleClickOpen,
    handleClose,
    harga,
    discount,
    country,
    harbor,
    product,
    description,
    total,
    isDirty,
    isValid,
  } = useHome();

  console.log(isValid, 'ini isValid');
  console.log(isDirty, 'ini isDirty');


  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Box sx={{
          backgroundColor: 'white',
          borderRadius: 2,
          boxShadow: 3,
          paddingX: 5,
          pb: 5,
          gap: 5,
          pt: 2,
          display: 'flex',
          flexDirection: 'column',
          width: theme.spacing(100)
        }}>
          <Typography variant="h3" color="black">Techinal Test</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={listCountry?.data || []}
                  getOptionLabel={(list) => list?.nama_negara}
                  isOptionEqualToValue={(option, value) =>
                    option && value ? option.nama_negara == value.nama_negara : false
                  }
                  onChange={(_, country) => {
                    field.onChange(country);
                    setValue('harbor', null);
                    setValue('product', null);
                    setValue('description', '');
                    setValue('discount', '');
                    setValue('harga', '');
                  }}
                  value={field.value}
                  renderOption={(props, item) => (
                    <li {...props} key={item.id_negara}>
                      {item.nama_negara}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name='Negara'
                      label='Negara'
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingCountry && <CircularProgress color='inherit' size={20} />}
                            {params.InputProps.endAdornment}
                          </>
                        )
                      }}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="harbor"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={listHarbor || []}
                  getOptionLabel={(list) => list?.nama_pelabuhan}
                  isOptionEqualToValue={(option, value) =>
                    option && value ? option.nama_pelabuhan == value.nama_pelabuhan : false
                  }
                  value={field.value}
                  onOpen={() => onOpenHarbor(watch('country.id_negara'))}
                  disabled={!watch('country.id_negara')}
                  onChange={(_, harbor) => {
                    field.onChange(harbor);
                    setValue('product', null)
                    setValue('description', '');
                    setValue('discount', '');
                    setValue('harga', '');
                  }}
                  renderOption={(props, item) => (
                    <li {...props} key={item.id_pelabuhan}>
                      {item.nama_pelabuhan}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name='Pelabuhan'
                      label='Pelabuhan'
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingHarbor && <CircularProgress color='inherit' size={20} />}
                            {params.InputProps.endAdornment}
                          </>
                        )
                      }}
                    />
                  )}
                />
              )}
            />

            <Controller
              name="product"
              control={control}
              render={({ field }) => (
                <Autocomplete
                  options={listProduct || []}
                  getOptionLabel={(list) => list?.nama_barang}
                  isOptionEqualToValue={(option, value) =>
                    option && value ? option.nama_barang == value.nama_barang : false
                  }
                  value={field.value}
                  onOpen={() => onOpenProduct(Number(watch('harbor.id_pelabuhan')))}
                  disabled={!watch('harbor.id_pelabuhan')}
                  onChange={(_, prodcut) => {
                    field.onChange(prodcut);
                    setValue('description', prodcut?.description || '');
                    setValue('discount', String(prodcut?.diskon) || '');
                    setValue('harga', String(prodcut?.harga) || '');
                  }}
                  renderOption={(props, item) => (
                    <li {...props} key={item.id_barang}>
                      {item.nama_barang}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      name='Barang'
                      label='Barang'
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {isLoadingProduct && <CircularProgress color='inherit' size={20} />}
                            {params.InputProps.endAdornment}
                          </>
                        )
                      }}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  required
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  label="Description"
                  InputLabelProps={{ shrink: true }}
                  multiline
                  rows={4}
                  disabled
                />
              )}
            />
            <Controller
              name="discount"
              control={control}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      field.onChange(value);
                    }
                  }}
                  label="Discount"
                />
              )}
            />
            <Controller
              name="harga"
              control={control}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      field.onChange(value);
                    }
                  }}
                  label="Harga"

                />
              )}
            />
            <Controller
              name="total"
              control={control}
              render={({ field }) => (
                <TextField
                  value={field.value}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      field.onChange(value);
                    }
                  }}
                  label="Total"
                />
              )}
            />
          </Box>
          {/* <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}>
            <Button
              variant="outlined"
              onClick={handleClickOpen}
              disabled={!isValid}
            >
              Save
            </Button>
          </Box> */}
        </Box>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>Detail Data</DialogTitle>
          <DialogContent dividers>
            <Typography variant="h6">Country</Typography>
            <Typography>ID: {country?.id_negara ?? "-"}</Typography>
            <Typography>Kode: {country?.kode_negara ?? "-"}</Typography>
            <Typography>Nama: {country?.nama_negara ?? "-"}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Harbor</Typography>
            <Typography>ID Negara: {harbor?.id_negara ?? "-"}</Typography>
            <Typography>ID Pelabuhan: {harbor?.id_pelabuhan ?? "-"}</Typography>
            <Typography>Nama: {harbor?.nama_pelabuhan ?? "-"}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Product</Typography>
            <Typography>ID Barang: {product?.id_barang ?? "-"}</Typography>
            <Typography>Nama: {product?.nama_barang ?? "-"}</Typography>
            <Typography>Deskripsi: {product?.description ?? "-"}</Typography>
            <Typography>Harga: {product?.harga ?? "-"}</Typography>
            <Typography>Diskon: {product?.diskon ?? "-"}</Typography>
            <Typography>ID Pelabuhan: {product?.id_pelabuhan ?? "-"}</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography>Description: {description ?? "-"}</Typography>
            <Typography>Discount: {discount ?? "-"}</Typography>
            <Typography>Harga: {harga ?? "-"}</Typography>
            <Typography>Total: {total ?? "-"}</Typography>
          </DialogContent>
        </Dialog>
      </main>
    </div>

  );
}
