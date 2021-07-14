import React, { useState } from 'react';
import { sendMail } from 'src/services/mail.service';
import { showEmailSentMessage } from 'src/services/sweet-alert-2.service';

interface FormData {
  name?: string;
  email?: string;
  body: string;
}

const initialFormData = {
  name: '',
  email: '',
  body: '',
};

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const setFormDataProperty: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    const propName = e.target.name as keyof FormData;
    setFormData({ ...formData, [propName]: e.target.value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFormData(initialFormData);
    try {
      await sendMail({
        from_email: formData.email!,
        from_name: formData.name!,
        message: formData.body,
      });
      showEmailSentMessage();
    } catch (err) {}
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="name">
          Name (Optional)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={setFormDataProperty}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="email">
          Your email (Optional)
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          type="email"
          placeholder="you@areawesome.com"
          value={formData.email}
          onChange={setFormDataProperty}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="body">
          Body
        </label>
        <textarea
          rows={5}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="body"
          name="body"
          value={formData.body}
          onChange={setFormDataProperty}
          required
        ></textarea>
      </div>
      <button
        className="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Send
      </button>
    </form>
  );
};

export default ContactForm;
