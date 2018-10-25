import styles from './index.css';
import MessageForm from '../../lib/components/message-form';
import MessagesList from '../../lib/components/messages-list';

const messageForm = new MessageForm;
const messagesList = new MessagesList;
messageForm.action = 'http://localhost:8081/message';

document.body.appendChild(messagesList);
document.body.appendChild(messageForm);

messageForm.addEventListener('new-message', function (event) {
	messagesList.addMessage(event.detail);
});