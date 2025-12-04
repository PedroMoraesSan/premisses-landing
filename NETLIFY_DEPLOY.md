# Guia de Deploy no Netlify - Premisses

Este guia explica como fazer o deploy do Premisses no Netlify.

## Pré-requisitos

1. Conta no Netlify
2. Conta no Notion (com integração criada)
3. Conta no Resend (com domínio verificado)
4. Conta no Upstash Redis

## Passo a Passo

### 1. Configurar Variáveis de Ambiente

No painel do Netlify, vá em **Site settings** > **Environment variables** e adicione as seguintes variáveis:

```
NOTION_SECRET=seu_secret_key_do_notion
NOTION_DB=id_do_seu_banco_de_dados_notion
RESEND_API_KEY=sua_api_key_do_resend
UPSTASH_REDIS_REST_URL=url_rest_do_upstash_redis
UPSTASH_REDIS_REST_TOKEN=token_do_upstash_redis
```

### 2. Conectar Repositório

1. Acesse o [Netlify Dashboard](https://app.netlify.com)
2. Clique em **Add new site** > **Import an existing project**
3. Conecte seu repositório Git (GitHub, GitLab ou Bitbucket)
4. Selecione o repositório do Premisses

### 3. Configurar Build Settings

O Netlify detectará automaticamente as configurações do `netlify.toml`, mas você pode verificar:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 20 (configurado automaticamente)

### 4. Deploy

1. Clique em **Deploy site**
2. O Netlify instalará automaticamente o plugin `@netlify/plugin-nextjs`
3. Aguarde o build completar

### 5. Configurar Domínio (Opcional)

1. Vá em **Site settings** > **Domain management**
2. Adicione seu domínio customizado
3. Configure os registros DNS conforme instruções

## Variáveis de Ambiente Necessárias

### Notion
- **NOTION_SECRET**: Chave secreta da integração do Notion
  - Obtenha em: https://www.notion.so/my-integrations
- **NOTION_DB**: ID do banco de dados do Notion
  - Extraia da URL do banco: `https://www.notion.so/{NOTION_DB}?v=...`

### Resend
- **RESEND_API_KEY**: Chave API do Resend
  - Obtenha em: https://resend.com/api-keys
  - **Importante**: Configure o domínio no Resend antes de fazer deploy

### Upstash Redis
- **UPSTASH_REDIS_REST_URL**: URL REST do banco Redis
- **UPSTASH_REDIS_REST_TOKEN**: Token de autenticação
  - Obtenha em: https://console.upstash.com/

## Troubleshooting

### Erro de Build
- Verifique se todas as variáveis de ambiente estão configuradas
- Confirme que o Node.js 20 está sendo usado
- Verifique os logs de build no Netlify

### Erro nas API Routes
- O plugin `@netlify/plugin-nextjs` gerencia automaticamente as rotas
- Certifique-se de que o plugin está instalado (será instalado automaticamente)

### Erro ao Enviar Email
- Verifique se o domínio está verificado no Resend
- Confirme que a variável `RESEND_API_KEY` está correta
- Verifique os logs da função no Netlify

## Suporte

Para mais informações sobre Next.js no Netlify:
- [Documentação oficial](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Plugin Next.js](https://github.com/netlify/netlify-plugin-nextjs)

