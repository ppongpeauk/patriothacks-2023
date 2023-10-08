import Layout from "@/layouts/Main";
import {
  Button,
  Container,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Sell() {
  const mediaUploadRef = useRef<any>(null);
  const [mediaPreview, setMediaPreview] = useState<any>(null);
  const toast = useToast();
  const { push } = useRouter();

  const onMediaUpload = (e: any) => {
    if (e.target && e.target.files) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setMediaPreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Head>
        <title>Sell - PeerPort</title>
      </Head>
      <Container maxW={"container.md"} minH={"calc(100dvh - 6rem)"} pt={16}>
        <Heading as={"h1"} size={"2xl"}>
          Sell
        </Heading>
        <Flex flexDir={"column"} justifyContent={"center"} py={8}>
          <Flex flexDir={"row"}>
            <Image
              src={mediaPreview || "/assets/placeholder.png"}
              alt={"Hero"}
              objectFit={"cover"}
              objectPosition={"center"}
              w={"340px"}
              h={"full"}
              aspectRatio={1 / 1}
              bg={"gray.200"}
              border={"1px solid"}
              borderColor={"gray.200"}
            />
            <Input
              display={"none"}
              type={"file"}
              ref={mediaUploadRef}
              onChange={onMediaUpload}
            />
            <Flex flexDir={"column"}>
              <Button
                onClick={() => {
                  mediaUploadRef.current.click();
                }}
              >
                Upload Image
              </Button>
              <Button
                onClick={() => {
                  setMediaPreview(null);
                }}
              >
                Remove Image
              </Button>
            </Flex>
            <Formik
              initialValues={{
                title: "",
                description: "",
                price: 0,
              }}
              onSubmit={async (values, actions) => {
                console.log(values);
                await fetch("/api/v1/sell", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    title: values.title,
                    description: values.description,
                    price: values.price,
                    icon: mediaPreview,
                  }),
                })
                  .then((data) => data.json())
                  .then(async (res) => {
                    console.log(res);
                    await toast({
                      title: "Success",
                      description:
                        "Your dispatch has been graciously accepted and duly dispatched to its intended audience.",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    await push(`/listing/${res?.id}`);
                  })
                  .catch(async (err) => {
                    await toast({
                      title: "Error",
                      description:
                        "Regrettably, an issue has arisen whilst attempting to dispatch your missive. Please kindly review your submission and rectify any errors forthwith.",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                  });

                await actions.setSubmitting(false);
              }}
            >
              {(props) => (
                <Form>
                  <Field name="name">
                    {({ field, form }: any) => (
                      <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input
                          id="name"
                          name="name"
                          type="name"
                          onChange={props.handleChange}
                          value={field.value}
                          placeholder="Name"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Field name="description">
                    {({ field, form }: any) => (
                      <FormControl>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                          id="description"
                          name="description"
                          onChange={props.handleChange}
                          value={field.value}
                          placeholder="Description"
                        />
                      </FormControl>
                    )}
                  </Field>
                  <Button
                    type="submit"
                    mt={4}
                    mb={2}
                    isLoading={props.isSubmitting}
                    w={"full"}
                  >
                    Propound the Dispatch
                  </Button>
                </Form>
              )}
            </Formik>
          </Flex>
        </Flex>
      </Container>
    </>
  );
}

Sell.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
