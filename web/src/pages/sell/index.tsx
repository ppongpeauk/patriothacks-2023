import { useAuthContext } from "@/contexts/AuthContext";
import Layout from "@/layouts/Main";
import {
  Box,
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
  const { user } = useAuthContext();

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
          Sell on PeerPort
        </Heading>
        <Flex flexDir={"column"} justify={"center"} py={8} w={"100%"}>
          <Flex flexDir={"row"} gap={4}>
            <Image
              src={mediaPreview || "/assets/branding/placeholder.png"}
              alt={"Hero"}
              objectFit={"cover"}
              objectPosition={"center"}
              w={"340px"}
              h={"full"}
              aspectRatio={1.5 / 1}
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
            <Flex flexDir={"column"} gap={2}>
              <Button
                onClick={() => {
                  mediaUploadRef.current.click();
                }}
                size={"sm"}
              >
                Upload Image
              </Button>
              <Button
                onClick={() => {
                  setMediaPreview(null);
                }}
                size={"sm"}
              >
                Remove Image
              </Button>
            </Flex>
          </Flex>
          <Formik
            initialValues={{
              title: "",
              description: "",
              price: "",
              category: "",
            }}
            onSubmit={async (values, actions) => {
              console.log(values);
              user.getIdToken().then(async (token: string) => {
                await fetch("/api/v1/sell", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify({
                    name: values.title,
                    description: values.description,
                    price: values.price,
                    category: values.category,
                    type: "item",
                    // icon: mediaPreview,
                  }),
                })
                  .then((data) => data.json())
                  .then(async (res) => {
                    console.log(res);
                    await toast({
                      title: "Success!",
                      description: "Your listing is now up! ✨",
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                    await push(`/listing/${res?.id}`);
                  })
                  .catch(async (err) => {
                    await toast({
                      title: "Error!",
                      description:
                        "There was an error creating your listing. Please try again later.",
                      status: "error",
                      duration: 5000,
                      isClosable: true,
                    });
                  });
              });

              await actions.setSubmitting(false);
            }}
          >
            {(props) => (
              <Box p={4}>
                <Form>
                  <Flex flexDir={"column"} gap={2}>
                    <Field name="name">
                      {({ field, form }: any) => (
                        <FormControl w={"320px"}>
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
                        <FormControl w={"320px"}>
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
                    <Field name="price">
                      {({ field, form }: any) => (
                        <FormControl w={"320px"}>
                          <FormLabel>Price</FormLabel>
                          <Input
                            id="price"
                            name="price"
                            type="text"
                            onChange={props.handleChange}
                            value={field.value}
                            placeholder="$5.99"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name="category">
                      {({ field, form }: any) => (
                        <FormControl w={"320px"}>
                          <FormLabel>Category</FormLabel>
                          <Input
                            id="category"
                            name="category"
                            type="text"
                            onChange={props.handleChange}
                            value={field.value}
                            placeholder="Clothing, Electronics, etc."
                          />
                        </FormControl>
                      )}
                    </Field>
                  </Flex>
                  <Button
                    type="submit"
                    mt={4}
                    mb={2}
                    isLoading={props.isSubmitting}
                  >
                    Submit Item
                  </Button>
                </Form>
              </Box>
            )}
          </Formik>
        </Flex>
      </Container>
    </>
  );
}

Sell.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
