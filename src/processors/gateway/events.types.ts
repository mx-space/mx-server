/*
 * @Author: Innei
 * @Date: 2020-05-21 11:05:42
 * @LastEditTime: 2020-06-07 15:15:08
 * @LastEditors: Innei
 * @FilePath: /mx-server/src/gateway/events.types.ts
 * @MIT
 */

export enum EventTypes {
  GATEWAY_CONNECT = 'GATEWAY_CONNECT',
  GATEWAY_DISCONNECT = 'GATEWAY_DISCONNECT',

  VISITOR_ONLINE = 'VISITOR_ONLINE',
  VISITOR_OFFLINE = 'VISITOR_OFFLINE',

  AUTH_FAILED = 'AUTH_FAILED',

  COMMENT_CREATE = 'COMMENT_CREATE',

  POST_CREATE = 'POST_CREATE',
  POST_UPDATE = 'POST_UPDATE',
  POST_DELETE = 'POST_DELETE',

  NOTE_CREATE = 'NOTE_CREATE',
  NOTE_UPDATE = 'NOTE_UPDATE',
  NOTE_DELETE = 'NOTE_DELETE',

  PAGE_UPDATED = 'PAGE_UPDATED',

  SAY_CREATE = 'SAY_CREATE',
  SAY_DELETE = 'SAY_DELETE',
  SAY_UPDATE = 'SAY_UPDATE',

  LINK_APPLY = 'LINK_APPLY',

  DANMAKU_CREATE = 'DANMAKU_CREATE',

  RECENTLY_CREATE = 'RECENTLY_CREATE',
  RECENTLY_DElETE = 'RECENTLY_DElETE',

  // util
  CONTENT_REFRESH = 'CONTENT_REFRESH', // 内容更新或重置 页面需要重载

  // for admin
  IMAGE_REFRESH = 'IMAGE_REFRESH',
  IMAGE_FETCH = 'IMAGE_FETCH',

  ADMIN_NOTIFICATION = 'ADMIN_NOTIFICATION',
}

export type NotificationTypes = 'error' | 'warn' | 'success' | 'info'
