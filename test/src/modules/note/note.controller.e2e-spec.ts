import { createE2EApp } from 'test/helper/e2e-create-app'
import { authProvider } from 'test/mock/modules/auth.mock'
import { configProvider } from 'test/mock/modules/config.mock'
import { gatewayProviders } from 'test/mock/modules/gateway.mock'
import { countingServiceProvider } from 'test/mock/processors/counting.mock'

import { EventEmitter2 } from '@nestjs/event-emitter'

import { CommentService } from '~/modules/comment/comment.service'
import { OptionModel } from '~/modules/configs/configs.model'
import { NoteController } from '~/modules/note/note.controller'
import { NoteModel } from '~/modules/note/note.model'
import { NoteService } from '~/modules/note/note.service'
import { UserModel } from '~/modules/user/user.model'
import { UserService } from '~/modules/user/user.service'
import { CountingService } from '~/processors/helper/helper.counting.service'
import { EventManagerService } from '~/processors/helper/helper.event.service'
import { HttpService } from '~/processors/helper/helper.http.service'
import { ImageService } from '~/processors/helper/helper.image.service'
import { TextMacroService } from '~/processors/helper/helper.macro.service'
import { SubPubBridgeService } from '~/processors/redis/subpub.service'

describe('NoteController (e2e)', () => {
  const { app } = createE2EApp(
    {
      controllers: [NoteController],
      providers: [
        NoteService,
        ImageService,
        EventManagerService,
        {
          provide: CommentService,
          useValue: {},
        },

        {
          provide: TextMacroService,
          useValue: {
            async replaceTextMacro(text) {
              return text
            },
          },
        },
        HttpService,
        configProvider,
        EventEmitter2,
        UserService,
        SubPubBridgeService,
        ...gatewayProviders,
        authProvider,
        CountingService,
        countingServiceProvider,
      ],
      imports: [],
    },
    [NoteModel, OptionModel, UserModel],
  )

  test('GET /notes', () => {
    return app
      .inject({
        method: 'GET',
        url: '/notes',
      })
      .then((res) => {
        expect(res.statusCode).toBe(200)
        expect(res.payload).toMatchInlineSnapshot(
          '"{\\"properties\\":{\\"url\\":{\\"$ref\\":\\"#/definitions/UrlDto\\"},\\"seo\\":{\\"$ref\\":\\"#/definitions/SeoDto\\"},\\"adminExtra\\":{\\"$ref\\":\\"#/definitions/AdminExtraDto\\"},\\"textOptions\\":{\\"$ref\\":\\"#/definitions/TextOptionsDto\\"},\\"mailOptions\\":{\\"$ref\\":\\"#/definitions/MailOptionsDto\\"},\\"commentOptions\\":{\\"$ref\\":\\"#/definitions/CommentOptionsDto\\"},\\"barkOptions\\":{\\"$ref\\":\\"#/definitions/BarkOptionsDto\\"},\\"friendLinkOptions\\":{\\"$ref\\":\\"#/definitions/FriendLinkOptionsDto\\"},\\"backupOptions\\":{\\"$ref\\":\\"#/definitions/BackupOptionsDto\\"},\\"baiduSearchOptions\\":{\\"$ref\\":\\"#/definitions/BaiduSearchOptionsDto\\"},\\"algoliaSearchOptions\\":{\\"$ref\\":\\"#/definitions/AlgoliaSearchOptionsDto\\"},\\"terminalOptions\\":{\\"$ref\\":\\"#/definitions/TerminalOptionsDto\\"}},\\"type\\":\\"object\\",\\"required\\":[\\"url\\",\\"seo\\",\\"adminExtra\\",\\"textOptions\\",\\"mailOptions\\",\\"commentOptions\\",\\"barkOptions\\",\\"friendLinkOptions\\",\\"backupOptions\\",\\"baiduSearchOptions\\",\\"algoliaSearchOptions\\",\\"terminalOptions\\"],\\"title\\":\\"设置\\",\\"ps\\":[\\"* 敏感字段不显示，后端默认不返回敏感字段，显示为空\\"],\\"definitions\\":{\\"UrlDto\\":{\\"properties\\":{\\"webUrl\\":{\\"type\\":\\"string\\",\\"title\\":\\"前端地址\\",\\"ui:options\\":{\\"halfGrid\\":true}},\\"adminUrl\\":{\\"type\\":\\"string\\",\\"title\\":\\"管理后台地址\\",\\"ui:options\\":{\\"halfGrid\\":true}},\\"serverUrl\\":{\\"type\\":\\"string\\",\\"title\\":\\"API 地址\\",\\"ui:options\\":{\\"halfGrid\\":true}},\\"wsUrl\\":{\\"type\\":\\"string\\",\\"title\\":\\"Gateway 地址\\",\\"ui:options\\":{\\"halfGrid\\":true}}},\\"type\\":\\"object\\",\\"title\\":\\"网站设置\\"},\\"SeoDto\\":{\\"properties\\":{\\"title\\":{\\"minLength\\":1,\\"type\\":\\"string\\",\\"title\\":\\"网站标题\\"},\\"description\\":{\\"minLength\\":1,\\"type\\":\\"string\\",\\"title\\":\\"网站描述\\"},\\"keywords\\":{\\"items\\":{\\"type\\":\\"string\\"},\\"type\\":\\"array\\",\\"title\\":\\"关键字\\"}},\\"type\\":\\"object\\",\\"title\\":\\"SEO 优化\\"},\\"AdminExtraDto\\":{\\"properties\\":{\\"enableAdminProxy\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"开启后台管理反代\\",\\"description\\":\\"是否可以通过 API 访问后台\\"},\\"background\\":{\\"type\\":\\"string\\",\\"title\\":\\"登录页面背景\\"},\\"title\\":{\\"type\\":\\"string\\",\\"title\\":\\"中后台标题\\"},\\"gaodemapKey\\":{\\"type\\":\\"string\\",\\"title\\":\\"高德查询 API Key\\",\\"description\\":\\"日记地点定位\\",\\"ui:options\\":{\\"type\\":\\"password\\"}}},\\"type\\":\\"object\\",\\"title\\":\\"后台附加设置\\"},\\"TextOptionsDto\\":{\\"properties\\":{\\"macros\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"开启文本宏替换\\"}},\\"type\\":\\"object\\",\\"title\\":\\"文本设定\\"},\\"MailOption\\":{\\"properties\\":{\\"port\\":{\\"type\\":\\"integer\\",\\"title\\":\\"发件邮箱端口\\",\\"ui:options\\":{\\"halfGrid\\":true}},\\"host\\":{\\"format\\":\\"url\\",\\"type\\":\\"string\\",\\"title\\":\\"发件邮箱 host\\",\\"ui:options\\":{\\"halfGrid\\":true}}},\\"type\\":\\"object\\"},\\"MailOptionsDto\\":{\\"properties\\":{\\"enable\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"开启邮箱提醒\\"},\\"user\\":{\\"format\\":\\"email\\",\\"type\\":\\"string\\",\\"title\\":\\"发件邮箱地址\\",\\"ui:options\\":{\\"halfGrid\\":true}},\\"pass\\":{\\"minLength\\":1,\\"type\\":\\"string\\",\\"title\\":\\"发件邮箱密码\\",\\"ui:options\\":{\\"type\\":\\"password\\",\\"halfGrid\\":true}},\\"options\\":{\\"$ref\\":\\"#/definitions/MailOption\\",\\"ui:option\\":{\\"connect\\":true}}},\\"type\\":\\"object\\",\\"title\\":\\"邮件通知设置\\"},\\"CommentOptionsDto\\":{\\"properties\\":{\\"antiSpam\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"反垃圾评论\\"},\\"disableComment\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"全站禁止评论\\",\\"description\\":\\"敏感时期专用\\"},\\"spamKeywords\\":{\\"items\\":{\\"type\\":\\"string\\"},\\"type\\":\\"array\\",\\"uniqueItems\\":true,\\"title\\":\\"自定义屏蔽关键词\\"},\\"blockIps\\":{\\"items\\":{\\"format\\":\\"ipv4\\",\\"type\\":\\"string\\"},\\"type\\":\\"array\\",\\"uniqueItems\\":true,\\"title\\":\\"自定义屏蔽 IP\\"},\\"disableNoChinese\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"禁止非中文评论\\"},\\"commentShouldAudit\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"只展示已读评论\\"},\\"recordIpLocation\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"评论公开归属地\\"},\\"fetchLocationTimeout\\":{\\"type\\":\\"integer\\",\\"title\\":\\"超时时间\\",\\"description\\":\\"获取 IP 归属地的超时时间。单位：毫秒。如获取超时则不记录\\"}},\\"type\\":\\"object\\",\\"title\\":\\"评论设置\\"},\\"BarkOptionsDto\\":{\\"properties\\":{\\"enable\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"开启 Bark 通知\\"},\\"key\\":{\\"type\\":\\"string\\",\\"title\\":\\"设备 Key\\"},\\"serverUrl\\":{\\"format\\":\\"url\\",\\"type\\":\\"string\\",\\"title\\":\\"服务器 URL\\",\\"description\\":\\"如果不填写，则使用默认的服务器，https://day.app/\\"},\\"enableComment\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"开启评论通知\\"}},\\"type\\":\\"object\\",\\"title\\":\\"Bark 通知设定\\"},\\"FriendLinkOptionsDto\\":{\\"properties\\":{\\"allowApply\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"允许申请友链\\"}},\\"type\\":\\"object\\",\\"title\\":\\"友链设定\\"},\\"BackupOptionsDto\\":{\\"properties\\":{\\"enable\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"开启自动备份\\",\\"description\\":\\"填写以下 COS 信息，将同时上传备份到 COS\\"},\\"secretId\\":{\\"type\\":\\"string\\",\\"title\\":\\"SecretId\\",\\"ui:options\\":{\\"halfGrid\\":true}},\\"secretKey\\":{\\"type\\":\\"string\\",\\"title\\":\\"SecretKey\\",\\"ui:options\\":{\\"type\\":\\"password\\",\\"halfGrid\\":true}},\\"bucket\\":{\\"type\\":\\"string\\",\\"title\\":\\"Bucket\\",\\"ui:options\\":{\\"halfGrid\\":true}},\\"region\\":{\\"type\\":\\"string\\",\\"title\\":\\"地域 Region\\",\\"ui:options\\":{\\"halfGrid\\":true}}},\\"type\\":\\"object\\",\\"title\\":\\"备份\\"},\\"BaiduSearchOptionsDto\\":{\\"properties\\":{\\"enable\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"开启推送\\"},\\"token\\":{\\"minLength\\":1,\\"type\\":\\"string\\",\\"title\\":\\"Token\\",\\"ui:options\\":{\\"type\\":\\"password\\"}}},\\"type\\":\\"object\\",\\"title\\":\\"百度推送设定\\"},\\"AlgoliaSearchOptionsDto\\":{\\"properties\\":{\\"enable\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"开启 Algolia Search\\"},\\"apiKey\\":{\\"type\\":\\"string\\",\\"title\\":\\"ApiKey\\",\\"ui:options\\":{\\"type\\":\\"password\\"}},\\"appId\\":{\\"type\\":\\"string\\",\\"title\\":\\"AppId\\"},\\"indexName\\":{\\"type\\":\\"string\\",\\"title\\":\\"IndexName\\"}},\\"type\\":\\"object\\",\\"title\\":\\"Algolia Search\\"},\\"TerminalOptionsDto\\":{\\"properties\\":{\\"enable\\":{\\"type\\":\\"boolean\\",\\"title\\":\\"开启 WebShell\\"},\\"password\\":{\\"type\\":\\"string\\",\\"title\\":\\"设定密码\\",\\"description\\":\\"密码为空则不启用密码验证\\",\\"ui:options\\":{\\"type\\":\\"password\\"}},\\"script\\":{\\"type\\":\\"string\\",\\"title\\":\\"前置脚本\\",\\"ui:options\\":{\\"type\\":\\"textarea\\"}}},\\"type\\":\\"object\\",\\"title\\":\\"终端设定\\"}},\\"default\\":{\\"seo\\":{\\"title\\":\\"我的小世界呀\\",\\"description\\":\\"哈喽~欢迎光临\\",\\"keywords\\":[]},\\"url\\":{\\"wsUrl\\":\\"http://127.0.0.1:2333\\",\\"adminUrl\\":\\"http://127.0.0.1:2333/proxy/qaqdmin\\",\\"serverUrl\\":\\"http://127.0.0.1:2333\\",\\"webUrl\\":\\"http://127.0.0.1:2323\\"},\\"mailOptions\\":{\\"enable\\":false,\\"user\\":\\"\\",\\"pass\\":\\"\\",\\"options\\":{\\"host\\":\\"\\",\\"port\\":465}},\\"commentOptions\\":{\\"antiSpam\\":false,\\"disableComment\\":false,\\"blockIps\\":[],\\"disableNoChinese\\":false,\\"fetchLocationTimeout\\":3000,\\"recordIpLocation\\":true,\\"spamKeywords\\":[],\\"commentShouldAudit\\":false},\\"barkOptions\\":{\\"enable\\":false,\\"key\\":\\"\\",\\"serverUrl\\":\\"https://api.day.app\\",\\"enableComment\\":true},\\"friendLinkOptions\\":{\\"allowApply\\":true},\\"backupOptions\\":{\\"enable\\":true,\\"region\\":null,\\"bucket\\":null,\\"secretId\\":null,\\"secretKey\\":null},\\"baiduSearchOptions\\":{\\"enable\\":false,\\"token\\":null},\\"algoliaSearchOptions\\":{\\"enable\\":false,\\"apiKey\\":\\"\\",\\"appId\\":\\"\\",\\"indexName\\":\\"\\"},\\"adminExtra\\":{\\"enableAdminProxy\\":true,\\"title\\":\\"おかえり~\\",\\"background\\":\\"\\",\\"gaodemapKey\\":null},\\"terminalOptions\\":{\\"enable\\":false,\\"password\\":null,\\"script\\":null},\\"textOptions\\":{\\"macros\\":true}}}"',
        )
      })
  })
})
