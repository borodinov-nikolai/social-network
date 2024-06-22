export {useGetMessagesQuery, useGetMessagesUnreadCountQuery, useMakeMessageReadMutation} from './api/client'
export {setMessages, addMessage, messageSlice, setQueryData} from './store/messageSlice'
export {messageSelector} from './store/selectors'
export type {IMessage} from './interfaces/message'