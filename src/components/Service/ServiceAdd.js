import React, { useEffect, useState } from "react";
import { Breadcrumb } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import * as Yup from "yup";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import UploadPopup from "./Service-Add-Components/UploadModal";
import {
  getCategoryList,
  getsubcategorylist,
  getamenitieslist,
  CreateService,
  AddImage,
  getProfitMethod,
} from "../../services/service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CircularProgress from "@mui/material/CircularProgress";
import TextEditor from "./TextEditor";
import { Radio, Paper, Typography } from "@mui/material";
import PerDestinationTable from "./Service-Add-Components/PerDestinationTable";
import PerDurationTable from "./Service-Add-Components/PerDurationTable";
import PerDayTable from "./Service-Add-Components/PerDayTable";
import PerTimeTable from "./Service-Add-Components/PerTimeTable";
import PerDateTable from "./Service-Add-Components/PerDateTable";
import PerDestinationModal from "./Service-Add-Components/PerDestinationModal";
import PerDurationModal from "./Service-Add-Components/PerDurationModal ";
import PerDayModal from "./Service-Add-Components/PerDayModal";
import PerTimeModal from "./Service-Add-Components/PerTimeModal";
import PerDateModal from "./Service-Add-Components/PerDateModal";

const ServiceAdd = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const isMobileView = useMediaQuery(theme.breakpoints.down("sm"));
  const params = useParams();
  const [isupdated, setIsUpdated] = useState(false);

  const AmenitiesobjectSchema = Yup.object({
    id: Yup.string().required(),
    image: Yup.string().required(),
    name: Yup.string().required(),
  });

  const servicepriceserviceobjectSchema = Yup.object({
    name: Yup.string().required(),
    price: Yup.string().required(),
  });

  const ServiceImagebjectSchema = Yup.object({
    image: Yup.mixed().test("file-type", "Image is required", (value) => {
      return typeof value === "object" && value instanceof File;
    }),
    imageURL: Yup.string().required(),
    thumbnail: Yup.string().required(),
  });

  const CategoryobjectSchema = Yup.object({
    id: Yup.string().required(),
    image: Yup.string().required(),
    name: Yup.string().required(),
  });

  const SubcategoryobjectSchema = Yup.object({
    id: Yup.string().required(),
    category: Yup.string().required(),
    name: Yup.string().required(),
  });

  const validationSchema = Yup.object({
    name: Yup.string()
    .required("Name is required")
    .max(20, "Name must be at most 20 characters"),
    machine_id: Yup.string()
    .required("ID is required")
    .max(20, "ID must be at most 20 characters"),
    amenities: Yup.array()
      .of(AmenitiesobjectSchema)
      .min(1, "Amenities is required"),
    category: Yup.array()
      .of(CategoryobjectSchema)
      .min(1, "Category is required"),
    sub_category: Yup.array()
      .of(SubcategoryobjectSchema)
      .min(1, "Sub-Category is required"),
    service_image: Yup.array()
      .of(ServiceImagebjectSchema)
      .min(1, "Image is required")
      .max(8, "Image must be less than or equal to 8"),
    service_price_service: Yup.array()
      .of(servicepriceserviceobjectSchema)
      .min(1, "Price is required"),
    description: Yup.string().required("Description is required"),
    pickup_point_or_location: Yup.string().required("Pickup Point is required"),
    embed: Yup.string().required("Embed is required"),
    cancellation_policy: Yup.string().required("Privacy Policy is required"),
    refund_policy: Yup.string().required("Refund Policy is required"),
    purchase_limit_min: Yup.number().when(
      "per_head_booking",
      ([per_head_booking], schema) => {
        if (per_head_booking === true) {
          return schema
            .required("Minimum is Required")
            .min(1, "Must be greater than zero");
        } else {
          return schema.notRequired();
        }
      }
    ),
    purchase_limit_max: Yup.number().when(
      "per_head_booking",
      ([per_head_booking], schema) => {
        if (per_head_booking === true) {
          return schema
            .required("Minimum is Required")
            .min(1, "Must be greater than zero");
        } else {
          return schema.notRequired();
        }
      }
    ),
    markup_fee: Yup.number().when(
      "profit_method",
      ([profit_method], schema) => {
        if (profit_method.name === "Upselling With Markup") {
          return schema
            .required("Markup Fee is Required")
            .min(1, "Must be greater than zero");
        } else {
          return schema.notRequired();
        }
      }
    ),
    vendor_percentage: Yup.number().when(
      "profit_method",
      ([profit_method], schema) => {
        if (profit_method.name === "Revenue Sharing") {
          return schema
          .required("Vendor Percentage is Required")
          .min(1, 'Must be greater than zero')
        } else {
          return schema.notRequired();
        }
      }
    ),
    sea_arabia_percentage: Yup.number().when(
      "profit_method",
      ([profit_method], schema) => {
        if (profit_method.name === "Revenue Sharing") {
          return schema
          .required("Sea Arbia Percentage is Required")
          .min(1, 'Must be greater than zero')
        } else {
          return schema.notRequired();
        }
      }
    ),

    lounge: Yup.number()
      .notOneOf([0], "Lounge cannot be zero")
      .max(10, "Lounge must be less than or equal to 10"),
    bedroom: Yup.number()
      .notOneOf([0], "Bedroom cannot be zero")
      .max(10, "Bedroom must be less than or equal to 10"),
    toilet: Yup.number()
      .notOneOf([0], "Toilet cannot be zero")
      .max(10, "Toilet must be less than or equal to 10"),
    capacity: Yup.number()
      .notOneOf([0], "Capacity cannot be zero")
      .min(1, 'Must be greater than zero')
      .max(10, "Capacity must be less than or equal to 10"),
    profit_method: Yup.object({
      id: Yup.string().required("ID is required"),
      name: Yup.string().required("Profit Method is required"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      is_verified: false,
      is_active: true,
      is_top_suggestion: false,
      is_premium: false,
      is_destination: true,
      is_duration: false,
      is_date: false,
      is_day: false,
      is_time: false,
      is_refundable: false,
      type: "",
      category: [],
      sub_category: [],
      name: "",
      machine_id: "",
      description: "",
      lounge: 0,
      bedroom: 0,
      toilet: 0,
      capacity: "",
      amenities: [],
      pickup_point_or_location: "",
      cancellation_policy: "",
      refund_policy: "",
      service_image: [],
      embed: "",
      profit_method: {
        id: "",
        name: "",
      },
      markup_fee: "",
      vendor_percentage: "",
      sea_arabia_percentage: "",
      per_head_booking: false,
      purchase_limit_min: "",
      purchase_limit_max: "",
      service_price_service: [],
      isActivity: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      const amenitiesmappedid = values.amenities.map((data) => {
        return data.id;
      });
      const formattedAmenities = amenitiesmappedid.join(",");

      const categorymappedid = values.category.map((data) => {
        return data.id;
      });
      const formattedcategory = categorymappedid.join(",");

      const subcategorymappedid = values.sub_category.map((data) => {
        return data.id;
      });
      const formattedsubcategory = subcategorymappedid.join(",");

      function removeServiceKey(values) {
        if (values.hasOwnProperty("service_price_service")) {
          values.service_price_service.forEach((item) => {
            if (item.hasOwnProperty("service")) {
              delete item.service;
            }
          });
        }

        return values.service_price_service;
      }

      const returnTrueFalse = (value) => {
        if (value === true) {
          return "True";
        } else {
          return "False";
        }
      };

      const data = {
        is_verified: returnTrueFalse(values.is_verified),
        is_active: returnTrueFalse(values.is_active),
        is_top_suggestion: returnTrueFalse(values.is_top_suggestion),
        is_premium: returnTrueFalse(values.is_premium),
        is_sail_with_activity: returnTrueFalse(values.is_sail_with_activity),
        is_recommended: returnTrueFalse(values.is_recommended),
        company: params.id,
        type: returnTrueFalse(values.type),
        category: formattedcategory,
        sub_category: formattedsubcategory,
        name: values.name,
        machine_id: values.machine_id,
        description: values.description,
        lounge: values.lounge,
        bedroom: values.bedroom,
        toilet: values.toilet,
        capacity: values.capacity!==""? values.capacity:0,
        amenities: formattedAmenities,
        pickup_point_or_location: values.pickup_point_or_location,
        cancellation_policy: values.cancellation_policy,
        refund_policy: values.refund_policy,
        is_duration: returnTrueFalse(values.is_duration),
        is_date: returnTrueFalse(values.is_date),
        is_day: returnTrueFalse(values.is_day),
        is_time: returnTrueFalse(values.is_time),
        is_destination: returnTrueFalse(values.is_destination),
        profit_method: values.profit_method.id,
        vendor_percentage: values.vendor_percentage!=="" ? values.vendor_percentage:0 ,
        sea_arabia_percentage: values.sea_arabia_percentage!=="" ? values.sea_arabia_percentage:0 ,
        markup_fee: values.markup_fee!==""? values.markup_fee:0,
        per_head_booking: returnTrueFalse(values.per_head_booking),
        map_embed: values.embed,
        purchase_limit_min: values.purchase_limit_min !=="" ? values.purchase_limit_min:0,
        purchase_limit_max: values.purchase_limit_max !=="" ? values.purchase_limit_max:0,
        is_refundable: returnTrueFalse(values.is_refundable),
        type: values.isActivity ? "Activity" : "Service",
        prices: values.service_price_service.map((dat) => {
          return {
            is_active: returnTrueFalse(dat.is_active),
            name: dat.name,
            price: dat.price,
            is_range: returnTrueFalse(dat.is_range),
            location: dat.location,
            duration_hour: dat.duration_hour,
            duration_minute: dat.duration_minute,
            duration_day: dat.duration_day,
            time: dat.time,
            end_time: dat.end_time,
            day: dat.day,
            end_day: dat.end_day,
            date: dat.date,
            end_date: dat.end_date,
          };
        }),
      };

      if (!isLoading) {
        try {
          const adminData = await CreateService(data);

          if (adminData) {
            setIsLoading(false);

            values.service_image.forEach((item, index) => {
              const formData = new FormData();
              formData.append("image", item.image);
              formData.append("service", adminData.id);
              formData.append("is_thumbnail", returnTrueFalse(item.thumbnail));

              // Using setTimeout to add a delay between each AddImage call
              setTimeout(() => {
                AddImage(formData)
                  .then((data) => console.log(data))
                  .catch((err) => console.log(err));
              }, index * 1000);
            });

            toast.success("Created Successfully");
            setIsUpdated(true);
          } else {
            console.error("Error while creating Admin:", adminData.error);
            setIsLoading(false);
          }
          setIsLoading(false);
        } catch (err) {
          toast.error(err?.message);
          setIsLoading(false);
        } finally {
          navigate(-1);
        }
      }
    },
  });

  const navigate = useNavigate();
  const [hovereffect, setHoverEffect] = useState("");
  const [categorylist, setCategoryList] = useState([]);
  const [ProfitMethods, setProfitMethods] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [subcategorylist, setSubcategoryList] = useState([]);
  const [amenitieslist, setAmenitiesList] = useState([]);
  const [PerDestinationopen, setPerDestinationopen] = useState(false);
  const [PerDurationopen, setPerDurationopen] = useState(false);
  const [PerDayopen, setPerDayopen] = useState(false);
  const [PerTimeopen, setPerTimeopen] = useState(false);
  const [PerDateopen, setPerDateopen] = useState(false);

  const handleHoverEffectTrue = (id) => {
    setHoverEffect(id);
  };

  const handleHoverEffectFalse = () => {
    setHoverEffect("");
  };

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    getProfitMethod()
      .then((data) => setProfitMethods(data?.results))
      .catch((error) => console.error(error));

    getCategoryList()
      .then((data) => setCategoryList(data))
      .catch((error) => console.error(error));

    getamenitieslist()
      .then((data) => setAmenitiesList(data?.results))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    getsubcategorylist(categoryId)
      .then((data) => setSubcategoryList(data))
      .catch((error) => console.error(error));
  }, [categoryId]);

  const categorystore = (id, name, image) => {
    formik.setValues((prev) => {
      const isCategoryExists = prev?.category?.some(
        (category) => category.id === id
      );

      if (!isCategoryExists) {
        return {
          ...prev,
          category: [{ id: id, name: name, image: image }],
        };
      }

      return prev;
    });
  };

  const subcategorystore = (id, name, category) => {
    formik.setValues((prev) => {
      const isCategoryExists = prev.sub_category.some(
        (category) => category.id === id
      );

      if (!isCategoryExists) {
        return {
          ...prev,
          sub_category: [{ id: id, name: name, category: category }],
        };
      }

      return prev;
    });
  };

  const handleIncrement = (fieldName) => {
    formik.setFieldValue(fieldName, formik.values[fieldName] + 1);
  };

  const handleDecrement = (fieldName) => {
    formik.setFieldValue(fieldName, Math.max(0, formik.values[fieldName] - 1));
  };

  const handleRemoveImage = (index) => {
    formik.setValues((prev) => {
      const updatedServicePriceService = [...prev.service_image];
      updatedServicePriceService.splice(index, 1);

      return {
        ...prev,
        service_image: updatedServicePriceService,
      };
    });
    toast.success("Image Removed Successfully");
  };

  const settingthumbnailTrue = (index, dat) => {
    formik.setValues((prev) => {
      const datas = {
        image: dat.image,
        thumbnail: true,
        imageURL: dat.imageURL,
      };

      const findIndex = prev.service_image.findIndex((dat, i) => i === index);

      if (findIndex !== -1) {
        let updatedService_image = [...prev.service_image];
        updatedService_image[findIndex] = datas;

        return {
          ...prev,
          service_image: updatedService_image,
        };
      }
    });
    toast.success("Thumbnail Set Successfully");
  };


  const handleopendestination = () => {
    setPerDestinationopen(true);
  };

  const handleclosedestination = () => {
    setPerDestinationopen(false);
  };

  const handleopenduration = () => {
    setPerDurationopen(true);
  };
  
  const handlecloseduration = () => {
    setPerDurationopen(false);
  };

  const handleopenday = () => {
    setPerDayopen(true);
  };
  const handlecloseday = () => {
    setPerDayopen(false);
  };

  const handleopentime = () => {
    setPerTimeopen(true);
  };
  const handleclosetime = () => {
    setPerTimeopen(false);
  };

  const handleopenDate = () => {
    setPerDateopen(true);
  };

  const handlecloseDate = () => {
    setPerDateopen(false);
  };

  const handleModalOpens = () => {
    if (formik.values.is_destination) {
      setPerDestinationopen(true);
    }
    if (formik.values.is_duration) {
      setPerDurationopen(true);
    }
    if (formik.values.is_day) {
      setPerDayopen(true);
    }
    if (formik.values.is_time) {
      setPerTimeopen(true);
    }
    if (formik.values.is_date) {
      setPerDateopen(true);
    }
  };

  const updateFormValues = (fields) => {
    formik.setValues((prev) => {
      return { ...prev, ...fields };
    });
  };

  const serviceListFilterData =
    formik.values.amenities && formik.values.amenities.length > 0
      ? amenitieslist &&
        amenitieslist.length > 0 &&
        amenitieslist.filter((item) => {
          return !formik.values.amenities.some(
            (refItem) => refItem.id === item.id
          );
        })
      : amenitieslist || [];

  return (
    <>
      {!isLoading && (
        <div className="page" style={{ top: 20 }}>
          <div className="container">
            <Breadcrumb style={{ marginLeft: "5px" }}>
              <Breadcrumb.Item href="#">
                Services
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.33333 5L12.7441 9.41074C13.0695 9.73618 13.0695 10.2638 12.7441 10.5893L8.33333 15"
                    stroke="#68727D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <span style={{ color: "#006875" }}>Add Service</span>
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="d-flex justify-content-between mt-5 ms-3">
              <div style={{ cursor: "pointer" }} onClick={() => navigate(-1)}>
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 12H4M4 12L10 6M4 12L10 18"
                    stroke="#252525"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>{" "}
                &nbsp;<span style={{ fontWeight: "800" }}>Back</span>
              </div>
            </div>
            <form
              onSubmit={formik.handleSubmit}
              className="row"
              style={{ position: "relative" }}
            >
              <div className={!isMobileView ? "col-8" : "col-12"}>
                <div
                  className="card mt-2"
                  style={{
                    width: isMobileView ? "col-12" : "col-8",
                    borderRadius: "8px",
                  }}
                >
                  <div className="p-5">
                    <div className="d-flex">
                      {" "}
                      <p style={{ fontWeight: "600", flex: 1 }}>
                        Service Details
                      </p>
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="isActivity"
                          id="isActivity"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          checked={formik.values.isActivity}
                          style={{ width: 20, height: 20 }}
                        />
                        <label class="form-check-label" for="Boat">
                          Is Activity
                        </label>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: isMobileView ? "column" : "row",
                      }}
                    >
                      <div
                        className="mr-2"
                        style={{ width: isMobileView ? "80vw" : "35vw" }}
                      >
                        <div>
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Category <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="category"
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                              formik.handleChange(e);
                              const selectedCategory = e.target.value;
                              setCategoryId(selectedCategory);
                              const selectedCategoryData = categorylist.find(
                                (category) => category.id === selectedCategory
                              );
                              if (selectedCategory === "Choose") {
                                formik.setFieldValue("category", []);
                              }
                              if (selectedCategoryData) {
                                categorystore(
                                  selectedCategoryData.id,
                                  selectedCategoryData.name,
                                  selectedCategoryData.image
                                );
                              }
                            }}
                          >
                            <option value={null}>Choose</option>
                            {categorylist?.map((data) => (
                              <option key={data.id} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                          {formik.touched.category && formik.errors.category ? (
                            <div className="error">
                              {formik.errors.category}
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Name <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.name && formik.errors.name ? (
                            <div className="error">{formik.errors.name}</div>
                          ) : null}
                        </div>
                      </div>
                      <div
                        className={!isMobileView ? "ms-3" : ""}
                        style={{ width: isMobileView ? "80vw" : "35vw" }}
                      >
                        <div className="mt-2">
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Sub Category <span style={{ color: "red" }}>*</span>
                          </label>
                          <select
                            className="form-control"
                            name="sub_category"
                            onBlur={formik.handleBlur}
                            onChange={(e) => {
                              formik.handleChange(e);
                              const selectedCategory = e.target.value;
                              const selectedCategoryData = subcategorylist.find(
                                (category) => category.id === selectedCategory
                              );
                              if (selectedCategory === "Choose") {
                                formik.setFieldValue("sub_category", []);
                              }
                              if (selectedCategoryData) {
                                subcategorystore(
                                  selectedCategoryData.id,
                                  selectedCategoryData.name,
                                  selectedCategoryData.category
                                );
                              }
                            }}
                          >
                            <option value={null}>Choose</option>
                            {subcategorylist?.map((data) => (
                              <option key={data.id} value={data.id}>
                                {data.name}
                              </option>
                            ))}
                          </select>
                          {formik.touched.sub_category &&
                          formik.errors.sub_category ? (
                            <div className="error">
                              {formik.errors.sub_category}
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            ID <span style={{ color: "red" }}>*</span>
                          </label>
                          <div>
                            <input
                              className="form-control"
                              type="text"
                              name="machine_id"
                              placeholder="ID"
                              value={formik.values.machine_id}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.machine_id &&
                            formik.errors.machine_id ? (
                              <div className="error">
                                {formik.errors.machine_id}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2">
                      <label
                        htmlFor=""
                        style={{ paddingBottom: "10px", fontWeight: "600" }}
                      >
                        Description <span style={{ color: "red" }}>*</span>
                      </label>
                      <TextEditor
                        {...formik}
                      />
                    </div>
                    <br></br>
                    <div className="mt-5">
                      <span style={{ fontWeight: "600" }}>Details</span>
                      <div className="d-flex mt-2">
                        <div className="mt-1">
                          <span style={{ color: "#68727D", fontSize: "15px" }}>
                            Lounge <span style={{ color: "red" }}>*</span>
                          </span>
                          <div className="mt-2">
                            <button
                              type="button"
                              className="btn px-1 py-1 mx-1"
                              onClick={() => handleDecrement("lounge")}
                            >
                              <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 10H17"
                                  stroke="#68727D"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                            <span className="mx-1">{formik.values.lounge}</span>
                            <button
                              type="button"
                              onClick={() => handleIncrement("lounge")}
                              className="btn px-1 py-1 mx-1"
                            >
                              <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 3L10 17"
                                  stroke="#252525"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M3 10H17"
                                  stroke="#252525"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                          {formik.touched.lounge && formik.errors.lounge ? (
                            <div className="error">{formik.errors.lounge}</div>
                          ) : null}
                        </div>

                        <div className="mt-1 ms-4">
                          <span style={{ color: "#68727D", fontSize: "15px" }}>
                            Bedroom <span style={{ color: "red" }}>*</span>
                          </span>
                          <div className="mt-2">
                            <button
                              type="button"
                              onClick={() => handleDecrement("bedroom")}
                              className="btn px-1 py-1 mx-1"
                            >
                              <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 10H17"
                                  stroke="#68727D"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                            <span className="mx-1">
                              {formik.values.bedroom}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleIncrement("bedroom")}
                              className="btn px-1 py-1 mx-1"
                            >
                              <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 3L10 17"
                                  stroke="#252525"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M3 10H17"
                                  stroke="#252525"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                          {formik.touched.bedroom && formik.errors.bedroom ? (
                            <div className="error">{formik.errors.bedroom}</div>
                          ) : null}
                        </div>

                        <div className="mt-1 ms-4">
                          <span style={{ color: "#68727D", fontSize: "15px" }}>
                            Toilet <span style={{ color: "red" }}>*</span>
                          </span>
                          <div className="mt-2">
                            <button
                              type="button"
                              onClick={() => handleDecrement("toilet")}
                              className="btn px-1 py-1 mx-1"
                            >
                              <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M3 10H17"
                                  stroke="#68727D"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                            <span className="mx-1">{formik.values.toilet}</span>
                            <button
                              type="button"
                              onClick={() => handleIncrement("toilet")}
                              className="btn px-1 py-1 mx-1"
                            >
                              <svg
                                width={20}
                                height={20}
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M10 3L10 17"
                                  stroke="#252525"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M3 10H17"
                                  stroke="#252525"
                                  strokeWidth={2}
                                  strokeLinecap="round"
                                />
                              </svg>
                            </button>
                          </div>
                          {formik.touched.toilet && formik.errors.toilet ? (
                            <div className="error">{formik.errors.toilet}</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: isMobileView ? "column" : "row",
                      }}
                      className="mt-2"
                    >
                      <div
                        className="mr-2"
                        style={{ width: isMobileView ? "80vw" : "35vw" }}
                      >
                        <div>
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Capacity <span style={{ color: "red" }}>*</span>
                          </label>
                          <input
                            type="number"
                            name="capacity"
                            className="form-control"
                            placeholder="0"
                            value={formik.values.capacity}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                          />
                          {formik.touched.capacity && formik.errors.capacity ? (
                            <div className="error">
                              {formik.errors.capacity}
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-2">
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Pickup Point
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <div style={{ position: "relative" }}>
                            <input
                              type="text"
                              placeholder=""
                              className="form-control"
                              name="pickup_point_or_location"
                              value={formik.values.pickup_point_or_location}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.pickup_point_or_location &&
                            formik.errors.pickup_point_or_location ? (
                              <div className="error">
                                {formik.errors.pickup_point_or_location}
                              </div>
                            ) : null}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              style={{
                                top: "10px",
                                right: "5px",
                                position: "absolute",
                              }}
                            >
                              <path
                                d="M3.3335 8.45209C3.3335 4.70425 6.31826 1.66602 10.0002 1.66602C13.6821 1.66602 16.6668 4.70425 16.6668 8.45209C16.6668 12.1706 14.5391 16.5097 11.2193 18.0614C10.4454 18.4231 9.55495 18.4231 8.78105 18.0614C5.46127 16.5097 3.3335 12.1706 3.3335 8.45209Z"
                                stroke="#68727D"
                                stroke-width="1.5"
                              />
                              <ellipse
                                cx="10"
                                cy="8.33398"
                                rx="2.5"
                                ry="2.5"
                                stroke="#68727D"
                                stroke-width="1.5"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div
                        className={!isMobileView ? "ms-3" : ""}
                        style={{ width: isMobileView ? "80vw" : "35vw" }}
                      >
                        <div
                          style={{
                            transform: isMobileView ? "" : "translateY(-60%)",
                          }}
                          className="mt-2"
                        >
                          <label
                            htmlFor=""
                            style={{
                              paddingBottom: "10px",
                              fontWeight: "600",
                              fontSize: "13px",
                            }}
                          >
                            Amenities <span style={{ color: "red" }}>*</span>
                          </label>
                          <Autocomplete
                            multiple
                            size="small"
                            id="multiple-limit-tags"
                            options={serviceListFilterData || []}
                            name="amenities"
                            getOptionLabel={(option) => `${option.name} `}
                            value={formik.values.amenities} // set the value prop
                            onChange={(event, newValue) => {
                              formik.setFieldValue("amenities", newValue); // use setFieldValue to update the field
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                placeholder="Amenities"
                                size="small"
                              />
                            )}
                          />
                          {formik.touched.amenities &&
                          formik.errors.amenities ? (
                            <div className="error">
                              {formik.errors.amenities}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="summary">
                      <label htmlFor="" className="form-label" style={{ fontWeight: "600"}}>
                        Embed
                      </label>
                      <textarea
                        name="embed"
                        id="embed"
                        placeholder="Embed"
                        className="form-control"
                        value={formik.values.embed || ""}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      ></textarea>
                      {formik.touched.embed && formik.errors.embed ? (
                        <div className="error">{formik.errors.embed}</div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div
                  className="card mt-2"
                  style={{
                    width: isMobileView ? "col-12" : "col-8",
                    borderRadius: "8px",
                  }}
                >
                  <div className="col-12 p-5">
                    <p style={{ fontWeight: "600" }}>Pricing</p>
                    <p style={{ fontWeight: "550" }}>
                      Profit Method <span style={{ color: "red" }}>*</span>{" "}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isMobileView ? "column" : "row",
                      }}
                    >
                      {ProfitMethods &&
                        ProfitMethods.map((data) => (
                          <div
                            className={`${isMobileView}? "col-12":"col-4" mx-1`}
                            style={{ marginBottom: isMobileView ? "5px" : "",cursor:"pointer" }}
                            onClick={() => {
                              updateFormValues({
                                ...formik.values,
                                profit_method: { id: data.id, name: data.name },
                                markup_fee: "",
                                sea_arabia_percentage: "",
                                vendor_percentage: "",
                              });
                            }}
                          >
                            <div
                              className="card p-2"
                              style={{ height: "150px", width: "15vw" }}
                            >
                              <div className="d-flex justify-content-between align-items-center">
                                <img
                                  src={data.icon}
                                  alt={data.name}
                                  style={{
                                    width: "30px",
                                    marginRight: "5px",
                                    backgroundColor: "#ECF4FF",
                                  }}
                                />
                                <div>
                                  <p style={{ fontWeight: "550" }}>
                                    {data.name}
                                  </p>
                                  <span
                                    className="text-wrap"
                                    style={{ fontSize: "12px" }}
                                  >
                                    {data?.description}
                                  </span>
                                </div>
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    name="profit_method"
                                    style={{
                                      height: "20px",
                                      width: "20px",
                                      borderRadius: "10px",
                                    }}
                                    type="checkbox"
                                    checked={
                                      formik.values.profit_method.id === data.id
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                    {formik.touched.profit_method?.name &&
                    formik.errors.profit_method?.name ? (
                      <div className="error">
                        {formik.errors.profit_method?.name}
                      </div>
                    ) : null}
                  </div>
                  {formik.values.profit_method.name ===
                    "Upselling With Markup" && (
                    <div className="w-50 mx-5">
                      <label
                        htmlFor=""
                        style={{
                          paddingBottom: "10px",
                          fontWeight: "600",
                          fontSize: "13px",
                        }}
                      >
                        Markup Fee <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="number"
                        name="markup_fee"
                        className="form-control"
                        placeholder="0"
                        value={formik.values.markup_fee}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.markup_fee && formik.errors.markup_fee ? (
                        <div className="error">{formik.errors.markup_fee}</div>
                      ) : null}
                    </div>
                  )}
                  {formik.values.profit_method.name === "Revenue Sharing" && (
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="w-50 mx-5">
                        <label
                          htmlFor=""
                          style={{
                            paddingBottom: "10px",
                            fontWeight: "600",
                            fontSize: "13px",
                          }}
                        >
                          Vendor Percentage{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="number"
                          name="vendor_percentage"
                          className="form-control"
                          placeholder="0"
                          value={formik.values.vendor_percentage}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.vendor_percentage &&
                        formik.errors.vendor_percentage ? (
                          <div className="error">
                            {formik.errors.vendor_percentage}
                          </div>
                        ) : null}
                      </div>

                      <div className="w-50 mx-5">
                        <label
                          htmlFor=""
                          style={{
                            paddingBottom: "10px",
                            fontWeight: "600",
                            fontSize: "13px",
                          }}
                        >
                          Sea Arabia Percentage{" "}
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          type="number"
                          name="sea_arabia_percentage"
                          className="form-control"
                          placeholder="0"
                          value={formik.values.sea_arabia_percentage}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        {formik.touched.sea_arabia_percentage &&
                        formik.errors.sea_arabia_percentage ? (
                          <div className="error">
                            {formik.errors.sea_arabia_percentage}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                  <div>
                    {/* <div className="px-5"> */}
                    <p
                      style={{
                        fontWeight: 550,
                        fontSize: "14px",
                        marginTop: "8px",
                      }}
                      className="ms-5"
                    >
                      Pricing Criterion
                    </p>
                    <div
                      className={
                        isMobileView
                          ? "d-flex flex-column"
                          : "d-flex justify-content-center"
                      }
                    >
                      <Paper
                        onClick={() =>
                          updateFormValues({
                            ...formik.values,
                            is_destination: true,
                            is_duration: false,
                            is_day: false,
                            is_time: false,
                            is_date: false,
                            purchase_limit_min: 0,
                            purchase_limit_max: 0,
                            service_price_service: [],
                          })
                        }
                        style={{
                          display: "flex",
                          cursor: "pointer",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid lightgray",
                          width: isMobileView ? "100%" : "17%",
                          border: formik.values.is_destination
                            ? "2px solid rgb(112, 112, 241)"
                            : "1px solid lightgray",
                          padding: "5px",
                          margin: "5px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "12px", fontWeight: "550" }}
                        >
                          Per Destination
                        </Typography>
                        <Radio
                          name={formik.values.price_cretrion}
                          checked={formik.values.is_destination}
                        />
                      </Paper>
                      <Paper
                        onClick={() =>
                          updateFormValues({
                            ...formik.values,
                            is_destination: false,
                            is_duration: true,
                            is_day: false,
                            is_time: false,
                            is_date: false,
                            per_head_booking: false,
                            purchase_limit_min: 0,
                            purchase_limit_max: 0,
                            service_price_service: [],
                          })
                        }
                        style={{
                          display: "flex",
                          cursor: "pointer",
                          justifyContent: "space-between",
                          marginTop: isMobileView ? "5px" : "",
                          alignItems: "center",
                          border: formik.values.is_duration
                            ? "2px solid rgb(112, 112, 241)"
                            : "1px solid lightgray",
                          width: isMobileView ? "100%" : "17%",
                          borderRadius: "5px",
                          padding: "5px",
                          margin: "5px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "12px", fontWeight: "550" }}
                        >
                          Per Duration
                        </Typography>
                        <Radio
                          name={formik.values.price_cretrion}
                          checked={formik.values.is_duration}
                        />
                      </Paper>
                      <Paper
                        onClick={() =>
                          updateFormValues({
                            ...formik.values,
                            is_destination: false,
                            is_duration: false,
                            is_day: true,
                            is_time: false,
                            is_date: false,
                            per_head_booking: false,
                            service_price_service: [],
                          })
                        }
                        style={{
                          display: "flex",
                          cursor: "pointer",
                          justifyContent: "space-between",
                          marginTop: isMobileView ? "5px" : "",
                          alignItems: "center",
                          border: formik.values.is_day
                            ? "2px solid rgb(112, 112, 241)"
                            : "1px solid lightgray",
                          width: isMobileView ? "100%" : "17%",
                          borderRadius: "5px",
                          padding: "5px",
                          margin: "5px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "12px", fontWeight: "550" }}
                        >
                          Per Day
                        </Typography>
                        <Radio
                          name={formik.values.price_cretrion}
                          checked={formik.values.is_day}
                        />
                      </Paper>
                      <Paper
                        onClick={() =>
                          updateFormValues({
                            ...formik.values,
                            is_destination: false,
                            is_duration: false,
                            is_day: false,
                            is_time: true,
                            is_date: false,
                            service_price_service: [],
                          })
                        }
                        style={{
                          display: "flex",
                          cursor: "pointer",
                          justifyContent: "space-between",
                          marginTop: isMobileView ? "5px" : "",
                          alignItems: "center",
                          border: formik.values.is_time
                            ? "2px solid rgb(112, 112, 241)"
                            : "1px solid lightgray",
                          width: isMobileView ? "100%" : "17%",
                          borderRadius: "5px",
                          padding: "5px",
                          margin: "5px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "12px", fontWeight: "550" }}
                        >
                          Per Time
                        </Typography>
                        <Radio
                          name={formik.values.price_cretrion}
                          checked={formik.values.is_time}
                        />
                      </Paper>
                      <Paper
                        onClick={() =>
                          updateFormValues({
                            ...formik.values,
                            is_destination: false,
                            is_duration: false,
                            is_day: false,
                            is_time: false,
                            is_date: true,
                            service_price_service: [],
                          })
                        }
                        style={{
                          display: "flex",
                          cursor: "pointer",
                          justifyContent: "space-between",
                          marginTop: isMobileView ? "5px" : "",
                          alignItems: "center",
                          border: formik.values.is_date
                            ? "2px solid rgb(112, 112, 241)"
                            : "1px solid lightgray",
                          width: isMobileView ? "100%" : "17%",
                          borderRadius: "5px",
                          padding: "5px",
                          margin: "5px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "12px", fontWeight: "550" }}
                        >
                          Per Date
                        </Typography>
                        <Radio
                          name={formik.values.price_cretrion}
                          checked={formik.values.is_date}
                        />
                      </Paper>
                    </div>
                    {/* </div> */}
                    <p
                      style={{
                        fontWeight: 550,
                        fontSize: "14px",
                        marginTop: "8px",
                      }}
                      className="ms-5"
                    >
                      Booking type
                    </p>
                    <div
                      className={
                        isMobileView
                          ? "d-flex flex-column"
                          : "d-flex justify-content-start ms-5"
                      }
                    >
                      <Paper
                        onClick={() => {
                          formik.setFieldValue("per_head_booking", false);
                          formik.setFieldValue("purchase_limit_min", 0);
                          formik.setFieldValue("purchase_limit_max", 0);
                        }}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          border: "1px solid lightgray",
                          width: isMobileView ? "100%" : "45%",
                          border:
                            formik.values.per_head_booking === false
                              ? "2px solid rgb(112, 112, 241)"
                              : "1px solid lightgray",
                          padding: "5px",
                          margin: "5px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "12px", fontWeight: "550" }}
                        >
                          Booking Entirely
                        </Typography>
                        <Radio
                          checked={formik.values.per_head_booking === false}
                        />
                      </Paper>

                      <Paper
                        onClick={() =>
                          formik.setFieldValue("per_head_booking", true)
                        }
                        style={{
                          display:
                            formik.values.is_destination ||
                            formik.values.is_duration
                              ? "none"
                              : "flex",
                          justifyContent: "space-between",
                          marginTop: isMobileView ? "5px" : "",
                          alignItems: "center",
                          border:
                            formik.values.per_head_booking === true
                              ? "2px solid rgb(112, 112, 241)"
                              : "1px solid lightgray",
                          width: isMobileView ? "100%" : "45%",
                          borderRadius: "5px",
                          padding: "5px",
                          margin: "5px",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{ fontSize: "12px", fontWeight: "550" }}
                        >
                          Per Head Booking
                        </Typography>
                        <Radio
                          checked={formik.values.per_head_booking === true}
                        />
                      </Paper>
                    </div>
                  </div>
                  {formik.values.per_head_booking && (
                    <div
                      className={
                        isMobileView
                          ? "d-flex flex-column"
                          : "d-flex justify-content-start mx-5 mt-5"
                      }
                    >
                      <div
                        style={{ border: "1px solid lightgray" }}
                        className="px-3 py-3 rounded"
                      >
                        <span style={{ fontWeight: "600" }}>
                          Set Purchase Limits
                        </span>
                        <div className="d-flex mt-2">
                          <div className="mt-1">
                            <span
                              style={{ color: "#68727D", fontSize: "15px" }}
                            >
                              Minimum <span style={{ color: "red" }}>*</span>
                            </span>
                            <div className="mt-2">
                              <button
                                type="button"
                                className="btn px-1 py-1 mx-1"
                                onClick={() =>
                                  handleDecrement("purchase_limit_min")
                                }
                              >
                                <svg
                                  width={20}
                                  height={20}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 10H17"
                                    stroke="#68727D"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                              <span className="mx-1">
                                {formik.values.purchase_limit_min}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleIncrement("purchase_limit_min")
                                }
                                className="btn px-1 py-1 mx-1"
                              >
                                <svg
                                  width={20}
                                  height={20}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L10 17"
                                    stroke="#252525"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M3 10H17"
                                    stroke="#252525"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                            </div>
                            {formik.touched.purchase_limit_min &&
                            formik.errors.purchase_limit_min ? (
                              <div className="error">
                                {formik.errors.purchase_limit_min}
                              </div>
                            ) : null}
                          </div>

                          <div className="mt-1 ms-4">
                            <span
                              style={{ color: "#68727D", fontSize: "15px" }}
                            >
                              Maximum <span style={{ color: "red" }}>*</span>
                            </span>
                            <div className="mt-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleDecrement("purchase_limit_max")
                                }
                                className="btn px-1 py-1 mx-1"
                              >
                                <svg
                                  width={20}
                                  height={20}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M3 10H17"
                                    stroke="#68727D"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                              <span className="mx-1">
                                {formik.values.purchase_limit_max}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  handleIncrement("purchase_limit_max")
                                }
                                className="btn px-1 py-1 mx-1"
                              >
                                <svg
                                  width={20}
                                  height={20}
                                  viewBox="0 0 20 20"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M10 3L10 17"
                                    stroke="#252525"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                  />
                                  <path
                                    d="M3 10H17"
                                    stroke="#252525"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                  />
                                </svg>
                              </button>
                              {formik.touched.purchase_limit_max &&
                              formik.errors.purchase_limit_max ? (
                                <div className="error">
                                  {formik.errors.purchase_limit_max}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div
                    className={
                      isMobileView ? "d-flex flex-column p-4" : " p-4 d-flex"
                    }
                  >
                    <div style={{ width: "100%" }}>
                      <div className="d-flex justify-content-between mb-2">
                        <label
                          htmlFor=""
                          style={{
                            paddingBottom: "10px",
                            fontWeight: "600",
                            fontSize: "13px",
                          }}
                        >
                          Price <span style={{ color: "red" }}>*</span>
                        </label>
                        <button
                          type="button"
                          className="btn btn-blue"
                          style={{
                            backgroundColor: "#187AF7",
                            padding: "1px 3px",
                          }}
                          onClick={handleModalOpens}
                        >
                          Add Price
                        </button>
                      </div>
                      {formik.values.is_destination && (
                        <PerDestinationTable
                          data={formik.values.service_price_service}
                          formik={formik.setValues}
                          setIsUpdated={setIsUpdated}
                        />
                      )}
                      {formik.values.is_duration && (
                        <PerDurationTable
                          data={formik.values.service_price_service}
                          formik={formik.setValues}
                          setIsUpdated={setIsUpdated}
                        />
                      )}
                      {formik.values.is_day && (
                        <PerDayTable
                          data={formik.values.service_price_service}
                          formik={formik.setValues}
                          setIsUpdated={setIsUpdated}
                        />
                      )}
                      {formik.values.is_time && (
                        <PerTimeTable
                          data={formik.values.service_price_service}
                          formik={formik.setValues}
                          setIsUpdated={setIsUpdated}
                        />
                      )}
                      {formik.values.is_date && (
                        <PerDateTable
                          data={formik.values.service_price_service}
                          formik={formik.setValues}
                          setIsUpdated={setIsUpdated}
                        />
                      )}
                      {formik.touched.service_price_service &&
                      formik.errors.service_price_service ? (
                        <div className="error">
                          {formik.errors.service_price_service}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                {formik.values.is_destination && PerDestinationopen && (
                  <PerDestinationModal
                    handleClose={handleclosedestination}
                    handleOpen={handleopendestination}
                    open={PerDestinationopen}
                    formiks={formik.setValues}
                  />
                )}
                {formik.values.is_duration && PerDurationopen && (
                  <PerDurationModal
                    handleClose={handlecloseduration}
                    handleOpen={handleopenduration}
                    open={PerDurationopen}
                    formiks={formik.setValues}
                  />
                )}
                {formik.values.is_day && PerDayopen && (
                  <PerDayModal
                    handleClose={handlecloseday}
                    handleOpen={handleopenday}
                    open={PerDayopen}
                    formiks={formik.setValues}
                  />
                )}
                {formik.values.is_time && PerTimeopen && (
                  <PerTimeModal
                    handleClose={handleclosetime}
                    handleOpen={handleopentime}
                    open={PerTimeopen}
                    formiks={formik.setValues}
                  />
                )}
                {formik.values.is_date && PerDateopen && (
                  <PerDateModal
                    handleClose={handlecloseDate}
                    handleOpen={handleopenDate}
                    open={PerDateopen}
                    formiks={formik.setValues}
                  />
                )}

                <div
                  style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                  className="mt-4 w-100 p-4"
                >
                  <p className="p-2" style={{ fontWeight: "700" }}>
                    Privacy Policy <span style={{ color: "red" }}>*</span>
                  </p>
                  <textarea
                    name="cancellation_policy"
                    id=""
                    cols="30"
                    rows="10"
                    className="form-control"
                    placeholder="Privacy Policy"
                    value={formik.values.cancellation_policy}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.touched.cancellation_policy &&
                  formik.errors.cancellation_policy ? (
                    <div className="error">
                      {formik.errors.cancellation_policy}
                    </div>
                  ) : null}

                  <div
                    style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                    className="mt-4 d-flex m-2 align-items-center"
                  >
                    <div style={{ fontWeight: "700" }}>Refund Available</div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <label class="switch" style={{ marginLeft: "5px" }}>
                        <input
                          type="checkbox"
                          name="is_refundable"
                          checked={formik.values.is_refundable}
                          value={formik.values.is_refundable}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span class="slider round"></span>
                      </label>{" "}
                      &nbsp;
                      <div style={{ fontSize: "14px" }}>
                        {formik.values.is_refundable === true ? "Yes" : "No"}
                      </div>
                    </div>
                  </div>

                  <p className="p-2 mt-2" style={{ fontWeight: "700" }}>
                    Refund Policy <span style={{ color: "red" }}>*</span>
                  </p>
                  <textarea
                    name="refund_policy"
                    id=""
                    cols="30"
                    rows="10"
                    className="form-control"
                    placeholder="Notes"
                    value={formik.values.refund_policy}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.touched.refund_policy &&
                  formik.errors.refund_policy ? (
                    <div className="error">{formik.errors.refund_policy}</div>
                  ) : null}
                </div>
                <div
                  style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                  className="mt-4 w-100 p-4"
                >
                  <p className="p-2 mt-2" style={{ fontWeight: "700" }}>
                    Set Status
                  </p>
                  <div className="d-flex justify-content-between align-items-center mx-2">
                    <p>Status</p>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div style={{ fontSize: "12px" }}>
                        {formik.values.is_active === true
                          ? "Active"
                          : "Inactive"}
                      </div>
                      <label class="switch" style={{ marginLeft: "5px" }}>
                        <input
                          type="checkbox"
                          name="is_active"
                          checked={formik.values.is_active}
                          value={formik.values.is_active}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div
                  style={{ backgroundColor: "#FFFF", borderRadius: "5px" }}
                  className="mt-3 w-100 px-2"
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="p-2" style={{ fontWeight: "700" }}>
                      Images <span style={{ color: "red" }}>*</span>
                    </p>
                    <button
                      type="button"
                      onClick={handleOpen}
                      className="btn px-2 py-1"
                      style={{
                        backgroundColor: "#187AF7",
                        color: "#ffff",
                        fontSize: "12px",
                      }}
                    >
                      Upload
                    </button>
                  </div>
                  {open && (
                    <UploadPopup
                      setIsLoading={setIsLoading}
                      setIsUpdated={setIsUpdated}
                      open={open}
                      handleClose={handleClose}
                      handleOpen={handleOpen}
                      service_image={formik.values.service_image}
                      formikset={formik.setValues}
                    />
                  )}
                  <p style={{ fontWeight: "550", fontSize: "12px" }}>
                    Thumbnail
                  </p>
                  <div className="row">
                    {formik.values.service_image.map((data, i) => (
                      <div className="col-6 mb-3" key={i}>
                        <div
                          style={{ position: "relative" }}
                          onMouseEnter={() => handleHoverEffectTrue(i)}
                          onMouseLeave={() => handleHoverEffectFalse()}
                        >
                          <img
                            src={data.imageURL}
                            className="rounded"
                            style={{
                              width: "200px",
                              height: "125px",
                              opacity: hovereffect === data.id ? 0.5 : 1,
                            }}
                          />
                          {hovereffect === i && (
                            <div
                              style={{
                                position: "absolute",
                                bottom: "50px",
                                left: "20px",
                                backgroundColor: "lightblack",
                              }}
                            >
                              <button
                                type="button"
                                className="btn btn-blue px-1 py-1 me-1"
                                style={{ fontSize: "10px", cursor: "pointer" }}
                                onClick={() => {
                                  settingthumbnailTrue(i, data);
                                }}
                              >
                                setThumbnail
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger px-1 py-1"
                                style={{ fontSize: "10px", cursor: "pointer" }}
                                onClick={() => handleRemoveImage(i)}
                              >
                                Remove
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    {formik.touched.service_image &&
                    formik.errors.service_image ? (
                      <div className="error">{formik.errors.service_image}</div>
                    ) : null}
                    {formik.values.service_image.length === 0 && (
                      <p
                        style={{
                          fontSize: "14px",
                          padding: "10px",
                          margin: "10px",
                          textAlign: "center",
                        }}
                      >
                        No Image Found
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <hr
                style={{ borderBottom: "2px solid black", marginTop: "10px" }}
              />
              <div className="d-flex justify-content-end">
                <button
                  type="reset"
                  className="m-1 btn btn-small btn-white"
                  onClick={() => formik.resetForm()}
                >
                  cancel
                </button>
                <button
                  type="submit"
                  className="m-1 btn btn-small"
                  style={{ backgroundColor: "#006875", color: "white" }}
                >
                  Add Service
                </button>
              </div>
            </form>
          </div>
          <br />
          <br />
        </div>
      )}

      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default ServiceAdd;
