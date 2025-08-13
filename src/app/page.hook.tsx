'use client'

import { yupResolver } from "@hookform/resolvers/yup";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { FormValues } from "./model/types";
import { useGetCountry, useGetHarbor, useGetProduct } from "./service/home.services";



export const schema: yup.ObjectSchema<FormValues> = yup.object({
    country: yup
      .object({
        id_negara: yup.number().required("ID negara wajib diisi"),
        kode_negara: yup.string().required("Kode negara wajib diisi"),
        nama_negara: yup.string().required("Nama negara wajib diisi"),
      })
      .nullable()
      .required("Country wajib diisi"),
  
    harbor: yup
      .object({
        id_negara: yup.string().required("ID negara pelabuhan wajib diisi"),
        id_pelabuhan: yup.string().required("ID pelabuhan wajib diisi"),
        nama_pelabuhan: yup.string().required("Nama pelabuhan wajib diisi"),
      })
      .nullable()
      .required("Harbor wajib diisi"),
  
    product: yup
      .object({
        description: yup.string().required("Deskripsi wajib diisi"),
        diskon: yup.number().required("Diskon wajib diisi"),
        harga: yup.number().required("Harga wajib diisi"),
        id_barang: yup.number().required("ID barang wajib diisi"),
        id_pelabuhan: yup.number().required("ID pelabuhan wajib diisi"),
        nama_barang: yup.string().required("Nama barang wajib diisi"),
      })
      .nullable()
      .required("Product wajib diisi"),
  
    discount: yup.string().required("Diskon wajib diisi"),
    harga: yup.string().required("Harga wajib diisi"),
    total: yup.string().required("Total wajib diisi"),
    description: yup.string().required("Deskripsi wajib diisi"),
  });


const useHome = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);


    const { data: listCountry, isLoading: isLoadingCountry } = useGetCountry();
    const { mutate: getHarbor, data: listHarbor, isPending: isLoadingHarbor } = useGetHarbor({});
    const { mutate: getProduct, data: listProduct, isPending: isLoadingProduct } = useGetProduct({});

    const {
        control,
        reset,
        watch,
        setValue,
        register,
        formState: {
            isValid,
            isDirty,
            errors,
        },

        handleSubmit: handleSubmitForm, } = useForm<FormValues>({
            defaultValues: {
                country: null,
                harbor: null,
                product: null,
                discount: '',
                harga: '',
                total: ''
            },
            resolver: yupResolver(schema),
        });

        const {
            harga,
            discount,
            country,
            harbor,
            product,
            description,
            total,
        } = watch();


        const onOpenHarbor = (id: number) => getHarbor(id);
        const onOpenProduct = (id: number) => getProduct(Number(id));

        useEffect(() => {
            if (harga && discount) {
              const amount = Number(harga) * Number(discount);
              setValue("total", String(amount));
            }
          }, [harga, discount, setValue]);


          const handleClickOpen = () => {
            setOpen(true);
          };
          const handleClose = () => {
            setOpen(false);
          };
    return {
        listCountry,
        isLoadingCountry,
        onOpenHarbor,
        onOpenProduct,
        control,
        listHarbor,
        listProduct,
        isLoadingHarbor,
        isLoadingProduct,
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
        isValid,
        isDirty
    }
}

export default useHome