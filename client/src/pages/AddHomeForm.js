import React from "react";
import { FormikAddressForm } from "../components/AddressForm";
import { Container } from "../styles";

const AddHomeForm = () => {
  const BACKEND_API_URI =
    process.env.NODE_ENV !== "production"
      ? "http://localhost:5000/api/homes"
      : "https://protected-oasis-33800.herokuapp.com/api/homes";
  return (
    <Container>
      <h2 style={{ marginBottom: "1rem" }}>Add a New Home</h2>
      <FormikAddressForm httpreq="post" uri={BACKEND_API_URI} />
    </Container>
  );
};

export default AddHomeForm;
