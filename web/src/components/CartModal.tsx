import { Item, Listing, Service } from "@/types";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

import moment from "moment";

const steps = [
  { title: "First", description: "Pick a Date" },
  { title: "Second", description: "Pick a Time" },
  { title: "Third", description: "Confirmation" },
];

export default function CartModal({
  isOpen,
  onClose,
  data,
}: {
  isOpen: boolean;
  onClose: () => void;
  data: Item | Service | Listing | null;
}) {
  const { activeStep } = useSteps({
    index: 1,
    count: steps.length,
  });

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={"2xl"}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Book Appointment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                date: null,
                time: "",
              }}
              onSubmit={async (values, actions) => {
                console.log(values);
              }}
            >
              {(props) => (
                <Form>
                  <Stepper index={activeStep} colorScheme={"black"} pb={4}>
                    {steps.map((step, index) => (
                      <Step key={index}>
                        <StepIndicator>
                          <StepStatus
                            complete={<StepIcon />}
                            incomplete={<StepNumber />}
                            active={<StepNumber />}
                          />
                        </StepIndicator>

                        <Box flexShrink="0">
                          <StepTitle>{step.title}</StepTitle>
                          <StepDescription>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator />
                      </Step>
                    ))}
                  </Stepper>

                  <Flex flexDir={"column"} w={"full"}>
                    {/* 
                        TODO: implement a better date picker system 
                        for now, 14 days past the current date is the max
                    */}
                    <Field name="date">
                      {({ field, form }: any) => (
                        <Flex
                          flexWrap={"wrap"}
                          gap={2}
                          my={2}
                          w={"full"}
                          align={"center"}
                          justify={"center"}
                        >
                          {[...Array(14)].map((_, i) => {
                            const date = new Date();
                            date.setDate(date.getDate() + i);
                            return (
                              <Button
                                key={i}
                                w={"240px"}
                                size={"md"}
                                colorScheme={
                                  field.value === date.toDateString()
                                    ? "black"
                                    : "gray"
                                }
                                onClick={() => {
                                  console.log(date.toDateString(), field.value);
                                  form.setFieldValue(
                                    "date",
                                    date.toISOString()
                                  );
                                }}
                              >
                                {moment(date).format("MMM Do")}
                              </Button>
                            );
                          })}
                        </Flex>
                      )}
                    </Field>
                  </Flex>
                </Form>
              )}
            </Formik>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
