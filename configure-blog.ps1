# Script de Configuração do Blog - Ferdinan
# Este script ajuda a configurar as variáveis de ambiente necessárias

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Configuração do Painel Admin Blog   " -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$envFile = ".env.local"

# Verificar se o arquivo já existe
if (Test-Path $envFile) {
    Write-Host "✓ Arquivo .env.local encontrado!" -ForegroundColor Green
    Write-Host ""
    
    $overwrite = Read-Host "Deseja reconfigurar? (s/n)"
    if ($overwrite -ne "s") {
        Write-Host "Configuração cancelada." -ForegroundColor Yellow
        exit
    }
}

Write-Host "Vamos configurar as variáveis de ambiente..." -ForegroundColor Yellow
Write-Host ""

# Coletar informações
Write-Host "1. Email de Administrador" -ForegroundColor Cyan
Write-Host "   (O email do Google que você usará para fazer login)" -ForegroundColor Gray
$adminEmail = Read-Host "   Digite seu email"

Write-Host ""
Write-Host "2. Google OAuth Client ID" -ForegroundColor Cyan
Write-Host "   (Obtenha em: https://console.cloud.google.com/)" -ForegroundColor Gray
$googleClientId = Read-Host "   Digite o Client ID"

Write-Host ""
Write-Host "3. Google OAuth Client Secret" -ForegroundColor Cyan
$googleClientSecret = Read-Host "   Digite o Client Secret"

Write-Host ""
Write-Host "4. Gerando NEXTAUTH_SECRET..." -ForegroundColor Cyan
$nextAuthSecret = node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
Write-Host "   ✓ Secret gerado!" -ForegroundColor Green

# Criar o arquivo .env.local
$envContent = @"
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:9002
NEXTAUTH_SECRET=$nextAuthSecret
AUTH_TRUST_HOST=true

# Google OAuth
GOOGLE_CLIENT_ID=$googleClientId
GOOGLE_CLIENT_SECRET=$googleClientSecret

# Admin Email (pode adicionar múltiplos separados por vírgula)
ADMIN_EMAIL=$adminEmail

# SMTP Configuration (Hostinger)
SMTP_USER=contact@ferdinan-msp.group
SMTP_PASS=sua_senha_smtp_aqui

# Discord Webhook
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/SEU_WEBHOOK_ID/SEU_WEBHOOK_TOKEN

# Firebase Configuration (se necessário)
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
"@

# Salvar arquivo
$envContent | Out-File -FilePath $envFile -Encoding utf8 -Force

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "   ✓ Configuração Concluída!           " -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Arquivo .env.local criado com sucesso!" -ForegroundColor Green
Write-Host ""
Write-Host "Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Certifique-se de ter configurado o OAuth no Google Cloud Console" -ForegroundColor White
Write-Host "   - Authorized JavaScript origins: http://localhost:9002" -ForegroundColor Gray
Write-Host "   - Authorized redirect URIs: http://localhost:9002/api/auth/callback/google" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Execute o servidor de desenvolvimento:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Acesse o painel admin:" -ForegroundColor White
Write-Host "   http://localhost:9002/admin/login" -ForegroundColor Cyan
Write-Host ""
Write-Host "Consulte o arquivo GUIA_DE_TESTES.md para mais informações." -ForegroundColor Gray
Write-Host ""
