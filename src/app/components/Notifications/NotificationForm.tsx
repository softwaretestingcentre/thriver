import React, { useState } from "react";

interface NotificationFormProps {
  onCreate: (message: string, type: string) => void;
}

const NotificationForm: React.FC<NotificationFormProps> = ({ onCreate }) => {
  const [message, setMessage] = useState("");
  const [type, setType] = useState("info");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message) {
      onCreate(message, type);
      setMessage("");
      setType("info");
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label={t('Create Notification')}>
      <label htmlFor="message">{t('Message')}</label>
      <input
        id="message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <label htmlFor="type">{t('Type')}</label>
      <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
        <option value="info">{t('Info')}</option>
        <option value="success">{t('Success')}</option>
        <option value="warning">{t('Warning')}</option>
        <option value="error">{t('Error')}</option>
      </select>
      <button type="submit">{t('Create Notification')}</button>
    </form>
  );
}

function t(str: string) {
  return str;
}
};

export default NotificationForm;
