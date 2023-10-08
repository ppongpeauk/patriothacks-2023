import { useAuthContext } from "@/contexts/AuthContext";
import Layout from "@/layouts/Main";
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Select } from "chakra-react-select";
import { Field, Form, Formik } from "formik";
import Head from "next/head";
import { useEffect, useState } from "react";

export default function Settings() {
  const { currentUser, refreshCurrentUser, user } = useAuthContext();
  const toast = useToast();

  const [interestsOptions, setInterestsOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const [residenceHallOptions, setResidenceHallOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const [genderOptions, setGenderOptions] = useState<
    { label: string; value: string }[]
  >([]);

  useEffect(() => {
    fetch("/api/v1/interests")
      .then((data) => data.json())
      .then((res: string[]) => {
        const i = res.map((interest: string) => ({
          label: interest,
          value: interest,
        }));
        console.log(i);
        setInterestsOptions(i as { label: string; value: string }[]);
      });
    fetch("/api/v1/college/halls")
      .then((data) => data.json())
      .then((res: string[]) => {
        const i = res.map((hall: string) => ({
          label: hall,
          value: hall,
        }));
        console.log(i);
        setResidenceHallOptions(i as { label: string; value: string }[]);
      });
    fetch("/api/v1/genders")
      .then((data) => data.json())
      .then((res: string[]) => {
        const i = res.map((gender: string) => ({
          label: gender,
          value: gender,
        }));
        console.log(i);
        setGenderOptions(i as { label: string; value: string }[]);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Settings - PeerPort</title>
      </Head>
      <Container
        as={"main"}
        maxW={"container.md"}
        minH={"calc(100dvh - 6rem)"}
        py={8}
      >
        <Heading as={"h1"}>Settings</Heading>
        <Formik
          enableReinitialize={true}
          initialValues={{
            name: currentUser?.name,
            email: currentUser?.email,
            emailEditable: false,
            description: currentUser?.description,
            interests:
              currentUser?.interests.map((interest) => ({
                label: interest,
                value: interest,
              })) || [],
            residenceHall: {
              label: currentUser?.college?.residenceHall,
              value: currentUser?.college?.residenceHall,
            },
          }}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(true);
            await user.getIdToken().then(async (token: string) => {
              await fetch("/api/v1/me", {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  name: values.name,
                  email: values.email,
                  description: values.description,
                  interests: values.interests.map((interest) => interest.value),
                  residenceHall: values.residenceHall,
                }),
              }).then(async (res) => {
                if (res.ok) {
                  await toast({
                    title: "Success!",
                    description: "Your profile has been updated.",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });
                  await refreshCurrentUser();
                } else {
                  await toast({
                    title: "Error!",
                    description: "Something went wrong.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
              });
            });
          }}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {(props) => (
            <Form>
              <VStack as={"section"} divider={<Divider />}>
                <Box w={"full"}>
                  <Heading as={"h2"} size={"lg"} pt={8} fontWeight={"normal"}>
                    Account
                  </Heading>
                  <Divider py={2} mb={4} />
                  <Flex flexDir={"row"} py={4} gap={4}>
                    <Avatar src={"/assets/branding/logo2.png"} size={"xl"} />
                    <Flex flexDir={"column"} gap={2} justify={"center"}>
                      <Button size={"sm"}>Change avatar</Button>
                      <Button size={"sm"}>Reset avatar</Button>
                    </Flex>
                  </Flex>
                  <Flex flexDir={"column"} gap={2}>
                    <Field name={"name"} placeholder={"Name"}>
                      {({ field, form }: any) => (
                        <FormControl w={"fit-content"}>
                          <FormLabel htmlFor={"name"}>Name</FormLabel>
                          <Input {...field} id={"name"} placeholder={"Name"} />
                        </FormControl>
                      )}
                    </Field>
                    <Field name={"email"} placeholder={"Email"}>
                      {({ field, form }: any) => (
                        <FormControl w={"fit-content"}>
                          <FormLabel htmlFor={"email"}>Email</FormLabel>
                          <InputGroup>
                            <Input
                              {...field}
                              id={"email"}
                              placeholder={"Email address"}
                              w={"240px"}
                              isDisabled={!form.values.emailEditable}
                            />
                            {!form.values.emailEditable && (
                              <InputRightElement width="4.5rem">
                                <Button
                                  h="1.75rem"
                                  size="sm"
                                  onClick={() => {
                                    form.setValues({
                                      ...form.values,
                                      emailEditable: true,
                                    });
                                  }}
                                >
                                  Edit
                                </Button>
                              </InputRightElement>
                            )}
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>
                    <Field name={"description"} placeholder={"About Me"}>
                      {({ field, form }: any) => (
                        <FormControl w={"fit-content"}>
                          <FormLabel htmlFor={"description"}>
                            About Me
                          </FormLabel>
                          <InputGroup>
                            <Textarea
                              {...field}
                              id={"description"}
                              placeholder={"I sell ___!"}
                              w={{ base: "240px", md: "340px" }}
                            />
                          </InputGroup>
                        </FormControl>
                      )}
                    </Field>
                    <Field name={"gender"}>
                      {({ field, form }: any) => (
                        <FormControl w={"320px"}>
                          <FormLabel htmlFor={"gender"}>Gender</FormLabel>
                          <Select
                            id={"gender"}
                            options={genderOptions as any}
                            value={field.value}
                            onChange={(value) => {
                              form.setFieldValue("gender", value);
                            }}
                            selectedOptionStyle="check"
                            placeholder="Select your gender..."
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name={"residenceHall"}>
                      {({ field, form }: any) => (
                        <FormControl w={"320px"}>
                          <FormLabel htmlFor={"residenceHall"}>
                            Residence Hall
                          </FormLabel>
                          <Select
                            id={"residenceHall"}
                            options={residenceHallOptions as any}
                            value={field.value}
                            onChange={(value) => {
                              form.setFieldValue("residenceHall", value);
                            }}
                            selectedOptionStyle="check"
                            placeholder="Residence Hall"
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Field name={"interests"}>
                      {({ field, form }: any) => (
                        <FormControl w={"320px"}>
                          <FormLabel htmlFor={"interests"}>Interests</FormLabel>
                          <Select
                            id={"interests"}
                            options={interestsOptions as any}
                            value={field.value}
                            onChange={(value) => {
                              form.setFieldValue("interests", value);
                            }}
                            isMulti={true}
                            closeMenuOnSelect={false}
                            hideSelectedOptions={false}
                            selectedOptionStyle="check"
                            placeholder="Select your interests..."
                          />
                        </FormControl>
                      )}
                    </Field>
                    <Button
                      type={"submit"}
                      w={"240px"}
                      mt={2}
                      isLoading={props.isSubmitting}
                    >
                      Update Profile
                    </Button>
                  </Flex>
                </Box>
              </VStack>
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
}

Settings.getLayout = function getLayout(page: any) {
  return <Layout>{page}</Layout>;
};
