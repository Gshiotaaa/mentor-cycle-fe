/* eslint-disable react-hooks/exhaustive-deps */
import FormSteps from "@components/FormSteps";
import Stepper from "@components/Stepper/Stepper";
import StepperVertical from "@components/StepperVertical";
import useForm from "@hooks/useForm";
import {
  ActionType,
  MultiStepFormContext,
  MultiStepFormProvider,
} from "providers/form";
import { useContext, useEffect } from "react";
import useLocalStorage from "@hooks/useLocalStorage";

const Register = () => {
  return (
    <MultiStepFormProvider>
      <MainSection />
    </MultiStepFormProvider>
  );
};

const MainSection = () => {
  const [formStorage] = useLocalStorage("form-data", null);
  const [isMentorStorage] = useLocalStorage("isMentor", null);
  const { formData, dispatch } = useContext(MultiStepFormContext);
  const { currentStep } = useForm();
  useEffect(() => {
    if (formStorage && isMentorStorage !== null) {
      dispatch({
        type: ActionType.UPDATE_FORM_DATA,
        payload: {
          ...formData,
          ...formStorage,
          isMentor: JSON.parse(isMentorStorage),
        },
      });
    }
  }, []);
  return (
    <main className="bg-neutral-03 min-h-[130vh] flex flex-col">
      <section className="bg-neutral-01 border-opacity-30 border-t border-b border-gray-02 w-full py-[52px] sm:justify-between 2xl:justify-around sm:px-8 lg:px-20 2xl:px-36 hidden sm:flex">
        <Stepper
          steps={[1, 2, 3]}
          currentStep={currentStep}
          className="hidden sm:block"
          size="regular"
        />
        <div className="max-w-xs">
          <h3 className="font-bold text-xl">Status do seu registro</h3>
          <p className="text-gray-02 text-xs w-3/4">
            Acompanhe em qual parte do registro você se encontra
          </p>
        </div>
      </section>
      <section className="w-full flex flex-col lg:flex-row justify-between 2xl:justify-evenly md:mt-12 lg:px-20 2xl:px-36 mb-20">
        <aside className="pt-10 md:pt-0">
          <h2 className="text-primary-05 text-3xl font-semibold text-center lg:text-start">
            Registre-se aqui!
          </h2>
          <p className="text-gray-04 text-sm mt-2 mb-12 px-4 sm:px-0 text-center lg:w-3/4 lg:text-start">
            Preencha os campos para criar a sua conta e acessar a plataforma!
          </p>
          <StepperVertical
            currentStep={currentStep}
            className="hidden lg:block"
          />
        </aside>
        <section className="max-w-2xl w-full m-auto lg:m-0 mb-24 px-4">
          <FormSteps />
        </section>
      </section>
    </main>
  );
};

export default Register;
