# Script para atualizar .env.local com as configurações do blog
# Execute este script após obter as credenciais do Google OAuth

Write-Host "🔧 Configurando variáveis de ambiente do Blog..." -ForegroundColor Cyan
Write-Host ""

# Ler valores atuais
$envPath = ".env.local"
$content = Get-Content $envPath -Raw

# Verificar se já tem as configurações do NextAuth
if ($content -match "NEXTAUTH_SECRET=\s*$") {
    Write-Host "⚠️  NEXTAUTH_SECRET está vazio. Atualizando..." -ForegroundColor Yellow
    
    # NEXTAUTH_SECRET já foi gerado
    $secret = "da81be0cbc50abef10c9665e384ebf34f2f59cfbab99a009d802b53f4110668c"
    $content = $content -replace "NEXTAUTH_SECRET=\s*$", "NEXTAUTH_SECRET=$secret"
    
    Write-Host "✅ NEXTAUTH_SECRET configurado!" -ForegroundColor Green
}

# Solicitar Google Client ID
Write-Host ""
Write-Host "📝 Cole o GOOGLE_CLIENT_ID (obtido no Google Cloud Console):" -ForegroundColor Cyan
$clientId = Read-Host

if ($clientId) {
    $content = $content -replace "GOOGLE_CLIENT_ID=.*", "GOOGLE_CLIENT_ID=$clientId"
    Write-Host "✅ GOOGLE_CLIENT_ID configurado!" -ForegroundColor Green
}

# Solicitar Google Client Secret
Write-Host ""
Write-Host "📝 Cole o GOOGLE_CLIENT_SECRET:" -ForegroundColor Cyan
$clientSecret = Read-Host

if ($clientSecret) {
    $content = $content -replace "GOOGLE_CLIENT_SECRET=.*", "GOOGLE_CLIENT_SECRET=$clientSecret"
    Write-Host "✅ GOOGLE_CLIENT_SECRET configurado!" -ForegroundColor Green
}

# Solicitar Admin Email
Write-Host ""
Write-Host "📝 Digite o email do administrador (que fará login no painel):" -ForegroundColor Cyan
$adminEmail = Read-Host

if ($adminEmail) {
    $content = $content -replace "ADMIN_EMAIL=.*", "ADMIN_EMAIL=$adminEmail"
    Write-Host "✅ ADMIN_EMAIL configurado!" -ForegroundColor Green
}

# Salvar arquivo
$content | Set-Content $envPath -NoNewline

Write-Host ""
Write-Host "🎉 Configuração concluída!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Resumo das configurações:" -ForegroundColor Cyan
Write-Host "  - NEXTAUTH_SECRET: ✅ Configurado" -ForegroundColor Gray
if ($clientId) { Write-Host "  - GOOGLE_CLIENT_ID: $clientId" -ForegroundColor Gray }
if ($clientSecret) { Write-Host "  - GOOGLE_CLIENT_SECRET: ****" -ForegroundColor Gray }
if ($adminEmail) { Write-Host "  - ADMIN_EMAIL: $adminEmail" -ForegroundColor Gray }
Write-Host ""
Write-Host "🚀 Próximo passo: npm run dev" -ForegroundColor Yellow
