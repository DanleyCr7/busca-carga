# Checklist manual de aquisição do piloto ABC

Nenhuma etapa abaixo é automatizada pela aplicação.

## AppsFlyer

- Criar/configurar os apps Android e iOS e copiar as chaves para os ambientes mobile.
- Gerar os builds mobile com `--dart-define=APPSFLYER_DEV_KEY=...`,
  `--dart-define=APPSFLYER_IOS_APP_ID=...` (somente números, sem `id`) e
  `--dart-define=APPSFLYER_ONELINK_TEMPLATE_ID=...`.
- Criar um template OneLink e dois links: `abc_client` e `abc_driver`.
- Configurar `deep_link_value=abc_client` e `deep_link_value=abc_driver`.
- Preencher `VITE_APPSFLYER_CLIENT_ONELINK_URL` e `VITE_APPSFLYER_DRIVER_ONELINK_URL` na landing.
- Depois de definir o domínio OneLink, associá-lo ao Android App Links e aos
  iOS Universal Links/Associated Domains. Essa configuração não pode ser
  fixada no repositório antes da criação do domínio.
- Validar instalação, deferred deep link e reinstalação em dispositivos de teste.

## Google e Meta

- Vincular Google Ads e Meta Ads ao AppsFlyer.
- Configurar SKAdNetwork no AppsFlyer para iOS sem solicitar ATT.
- Mapear eventos do app sem PII: cadastro, cobertura, solicitação, cotação, promoção e pagamento.

## GTM, GA4 e Meta Pixel

- Criar os IDs e preencher `VITE_GTM_ID`, `VITE_GA4_ID` e `VITE_META_PIXEL_ID`.
- Publicar no GTM apenas tags condicionadas ao Consent Mode concedido.
- Validar `landing_view`, `coverage_view`, `store_cta_click`, `driver_cta_click` e `promotion_view`.
- Confirmar que “Recusar” não carrega GA4 ou Meta.

## Campanha ABC30

- Manter `DRAFT` durante QA em DEV.
- Validar cotação, concorrência do último uso, pagamento e liberação em falha/cancelamento.
- Ativar pelo backoffice somente após a versão mobile com checkout promocional estar publicada.
