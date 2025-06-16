import ActionButton from "../../components/actionButton/ActionButton";
import FormInput from "../../components/formInput/FormInput";
import Layout from "../../components/layout/Layout";

const CreateProgram = () => {
    return (
        <Layout title="Create Program">
            <div className="flex flex-col w-full gap-6 mb-6 bg-cardColor border border-borderColor p-4 rounded">
                <FormInput
                    name="program-name"
                    label="Program Name"
                    value=""
                    onChange={() => {}}
                />
                <FormInput
                    name="program-description"
                    label="Program Description"
                    type="textarea"
                    value=""
                    onChange={() => {}}
                />
                <FormInput
                    name="program-start-date"
                    label="Program Start Date"
                    type="date"
                    value=""
                    onChange={() => {}}
                />
                <FormInput
                    name="program-end-date"
                    label="Program End Date"
                    type="date"
                    value=""
                    onChange={() => {}}
                />
            </div>
            <div className="flex flex-col gap-3">
                <ActionButton label="Add Trainer to Pool" onClick={() => {}} />
                <ActionButton
                    label="Add Moderators to Pool"
                    onClick={() => {}}
                />
                <ActionButton
                    label="Add Candidates to Pool"
                    onClick={() => {}}
                />
                <ActionButton label="Create New Session" onClick={() => {}} />
                <ActionButton
                    label="Add Sessions to Schedule"
                    onClick={() => {}}
                />
            </div>
            
        </Layout>
    );
};

export default CreateProgram;
