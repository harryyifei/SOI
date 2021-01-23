## 简介

Clash、Quantumult(X)、Shadowrocket、Surge 的配置规则文件

## 规则

规则分为 Scripts Rulesets & Surge Modules.

### 专业版

DOH 使用特供版本，应对国内各种 DNS 污染以及广告问题

- 备选方案有 NextDNS 免费版本
- Cloudflare + Adguard 方案（配置较为麻烦）
- Surge 配合 Surgio + Modules 使用

### 导入配置教程


| 应用 | Surgio |                          ihie Rules                          | 机场配置 |  |
| :-: | :-: | :-: | :-: | --- |
| Surge iOS | 自建托管 | [**地址**](https://github.com/lhie1/Rules/tree/master) |  |  |
|  Surge Mac   | ⬆️️ | ⬆️️ | |  |
| Quantumult X | 托管Node | ⬆️️ | |  |
| Shadowrocket | 托管Node | [地址](https://raw.githubusercontent.com/lhie1/Rules/master/Shadowrocket/Complete.conf) | |  |
| Clash |  |  | |  |





## DNS

**如果经常使用的网络没有 DNS 劫持问题，则配置为使用系统 DNS 并追加公共 DNS，如：**

```
# 电信 118.118.118.118
# 联通 116.116.116.116
```

### 配置 DOH

可以通过 Surge 4 支持的 DOH 模块来增加 DNS 的访问效率以及速度，例如 NextDNS 提供的免费服务

[NextDNS](https://nextdns.io)



---

### 关于 Surge Ruleset 和 Quantumult X Filter Remote 说明

**要求**排序如下：

1. Unbreak.list - 用于修正后续规则行为
2. Advertising.list - 广告、行为分析、隐私追踪（macOS 不建议开启）
3. Hijacking.list - 劫持（运营商、臭名昭著的诈骗网站或恶意应用）
4. GlobalMedia(ForeignMedia).list - 国际流媒体
5. HKMTMedia(DomesticMedia).list - 大陆流媒体面向港澳台限定（可不加）
6. Global.list - 国际网站/应用
7. Apple.list - Apple 服务（可不加）
8. China.list - 国内网站/应用

**说明**

- 如若**不需要**观看哔哩哔哩、爱奇艺面向港澳台的限定内容可不加「HKMTMedia(DomesticMedia).list」。
- 如若**不需要**代理 Apple 服务可不加「Apple.list」，若加入必须在「Global.list」和「China.list」之间。
- 如需细化流媒体如「Youtube.list」需要加在「GlobalMedia(ForeignMedia).list」之前。
- 如需应用类的如「Telegram.list、Google.list、PayPal.list」需要加在「Global.list」之前。

一般情况下默认引入上述 8 个（如不需要 HKMTMedia(DomesticMedia) 和 Apple 可减至 6 个）即可，那么为什么还有更多的如「Youtube.list、Netflix.list、Spotify.list、Mail.list」？

1. 对于一些「进阶玩家」来说其拥有专用于观看流媒体的线路，比如观看限定区域的 Netflix、Hulu、HBO 等，所以引入相关 .list 建立一个策略组设置相应服务区节点线路。但对于普通用户来说，那些「Youtube.list、Hulu.list」来说都是集成在「GlobalMedia(ForeignMedia).list」中**不需要**额外引入。
2. 对于一些「机场」来说为了避免有恶意用户利用节点线路滥发垃圾邮件，所以对服务器相关邮件端口进行了屏蔽，这时候可以引入「Mail.list」指定一个可收发邮件对节点。
3. 对于一些「进阶玩家」来说其拥有高速的新加坡节点线路，为了提升 Telegram 使用体验所以会引入「Telegram.list」指定一些节点。

综上所述、以此类推，独立的 .list 一般都集成在了默认的 6 条 .list 文件中，如果你没有进阶的定制化需求是**不 需 要**引入那么多的，根据需求使用才是 Ruleset/Filter 的灵活用法，规则不是越多越好。

---

### 关于去广告

#### ⚠️ 为什么 Youtube、知乎、微博等应用（存在于 MitM 域名列表）无法使用？

1. 开启「HTTPS 解密(MitM)」功能
2. 安装证书
3. **到系统「设置 > 通用 > 关于本机」中底部的「证书信任设置」中信任所安装的证书！**

#### 为什么某应用还是有广告

**1.缓存**

有些应用会**将广告缓存**，如果在使用规则前应用就已经缓存了广告，所以你需要：

1. 应用内设置里清除缓存。
2. 但有的应用并不会清除广告的缓存，所以需要将应用删除重装。

⚠️ 广告加载是实时的，这就意味着：

- 需要实时开着类 Surge 应用托管网络
- 即便一直开着，但在遇到信号断开重连、蜂窝数据和 Wi-Fi 网络切换时会有一些网络请求先于类 Surge 应用加载导致广告出现，怎么办？看上面两步。

**2.功能**

广告阻止不仅于使用 [Rule] 规则，有的广告需要 [URL Rewrite] 和 [MITM]，这就意味着：

- Surge 虽然支持 [URL Rewrite] 和 [MITM]，但无法处理 TUN 的广告。
- Quantumult 虽然支持 [URL Rewrite] 和 [MITM]，但需要在「更多 > 附加功能」中开启「激进阻止」以更全面的支持（X 版本默认带此功能）否则同 Surge 效果一样，但 Quantumult 对于 IP 不会进行 MitM，所以有的广告不能如 Surge 一般去除。
- Shadowrocket 的 [MITM] 功能不稳定影响正常功能，已从规则配置中移除，不再支持。
- Kitsunebi 不支持 [URL Rewrite] 和 [MITM]。
- Surfboard 仅支持 [URL Rewrite] 且仅支持 302 没有阻止功能。

**3.规则不是万能的**

不是所有广告都能简单的依靠规则阻止。

**4.其他**

> Youtube 去视频广告会造成以下问题

- 网页版可能无法正常播放
- YouTube Premium 用户无法正常播放
- Quantumult 遇到片头广告时可能会卡黑屏

所以默认并没有启用，如果仍需启用需在「HTTPS 解密(MitM)」的「主机名」列表中添加：

```
*.googlevideo.com
```

⚠️ 注意：如果开启了代理服务器的「UDP 转发」会失效。

---

## 感谢

- [lhie1](https://github.com/lhie1)

## 许可

[MIT License](https://github.com/ConnersHua/Profiles/raw/master/LICENSE)
