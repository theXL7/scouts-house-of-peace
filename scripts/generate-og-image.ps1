Add-Type -AssemblyName System.Drawing

$workspace = Split-Path -Parent $PSScriptRoot
$outputDirectory = Join-Path $workspace "public\og"
$outputPath = Join-Path $outputDirectory "scouts-maison-paix-share.png"
$heroPath = Join-Path $workspace "public\hero\hero-bg.png"
$logoPath = Join-Path $workspace "public\scouts-house-of-peace-logo.png"

if (-not (Test-Path $outputDirectory)) {
  New-Item -ItemType Directory -Path $outputDirectory | Out-Null
}

$width = 1200
$height = 630
$bitmap = New-Object System.Drawing.Bitmap($width, $height)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
$graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$graphics.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAliasGridFit

function Draw-CoverImage {
  param(
    [System.Drawing.Graphics]$Graphics,
    [System.Drawing.Image]$Image,
    [int]$TargetWidth,
    [int]$TargetHeight
  )

  $sourceRatio = $Image.Width / $Image.Height
  $targetRatio = $TargetWidth / $TargetHeight

  if ($sourceRatio -gt $targetRatio) {
    $cropHeight = $Image.Height
    $cropWidth = [int]($cropHeight * $targetRatio)
    $cropX = [int](($Image.Width - $cropWidth) / 2)
    $cropY = 0
  }
  else {
    $cropWidth = $Image.Width
    $cropHeight = [int]($cropWidth / $targetRatio)
    $cropX = 0
    $cropY = [int](($Image.Height - $cropHeight) / 2)
  }

  $sourceRectangle = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropWidth, $cropHeight)
  $destinationRectangle = New-Object System.Drawing.Rectangle(0, 0, $TargetWidth, $TargetHeight)
  $Graphics.DrawImage(
    $Image,
    $destinationRectangle,
    $sourceRectangle,
    [System.Drawing.GraphicsUnit]::Pixel
  )
}

function New-RoundedRectanglePath {
  param(
    [float]$X,
    [float]$Y,
    [float]$Width,
    [float]$Height,
    [float]$Radius
  )

  $diameter = $Radius * 2
  $path = New-Object System.Drawing.Drawing2D.GraphicsPath
  $path.AddArc($X, $Y, $diameter, $diameter, 180, 90)
  $path.AddArc($X + $Width - $diameter, $Y, $diameter, $diameter, 270, 90)
  $path.AddArc($X + $Width - $diameter, $Y + $Height - $diameter, $diameter, $diameter, 0, 90)
  $path.AddArc($X, $Y + $Height - $diameter, $diameter, $diameter, 90, 90)
  $path.CloseFigure()

  return $path
}

function Get-WrappedLines {
  param(
    [System.Drawing.Graphics]$Graphics,
    [string]$Text,
    [System.Drawing.Font]$Font,
    [int]$MaxWidth
  )

  $lines = New-Object System.Collections.Generic.List[string]
  $currentLine = ""

  foreach ($word in ($Text -split " ")) {
    $candidate = if ([string]::IsNullOrWhiteSpace($currentLine)) {
      $word
    }
    else {
      "$currentLine $word"
    }

    $candidateWidth = $Graphics.MeasureString($candidate, $Font).Width

    if ($candidateWidth -le $MaxWidth) {
      $currentLine = $candidate
      continue
    }

    if (-not [string]::IsNullOrWhiteSpace($currentLine)) {
      $lines.Add($currentLine)
    }

    $currentLine = $word
  }

  if (-not [string]::IsNullOrWhiteSpace($currentLine)) {
    $lines.Add($currentLine)
  }

  return $lines
}

$heroImage = [System.Drawing.Image]::FromFile($heroPath)
$logoImage = [System.Drawing.Image]::FromFile($logoPath)

Draw-CoverImage -Graphics $graphics -Image $heroImage -TargetWidth $width -TargetHeight $height

$overlayBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
  (New-Object System.Drawing.Point(0, 0)),
  (New-Object System.Drawing.Point($width, $height)),
  ([System.Drawing.Color]::FromArgb(228, 13, 26, 37)),
  ([System.Drawing.Color]::FromArgb(196, 38, 77, 59))
)
$graphics.FillRectangle($overlayBrush, 0, 0, $width, $height)

$glowBrush = New-Object System.Drawing.SolidBrush(
  [System.Drawing.Color]::FromArgb(54, 247, 243, 236)
)
$graphics.FillEllipse($glowBrush, 760, -110, 420, 260)
$graphics.FillEllipse($glowBrush, 820, 360, 280, 160)

$panelPath = New-RoundedRectanglePath -X 56 -Y 48 -Width 1088 -Height 534 -Radius 34
$panelBrush = New-Object System.Drawing.SolidBrush(
  [System.Drawing.Color]::FromArgb(162, 16, 28, 42)
)
$panelBorder = New-Object System.Drawing.Pen(
  [System.Drawing.Color]::FromArgb(92, 255, 244, 229),
  2
)
$graphics.FillPath($panelBrush, $panelPath)
$graphics.DrawPath($panelBorder, $panelPath)

$logoRectangle = New-Object System.Drawing.Rectangle(92, 86, 170, 170)
$graphics.DrawImage($logoImage, $logoRectangle)

$eyebrowBrush = New-Object System.Drawing.SolidBrush(
  [System.Drawing.Color]::FromArgb(255, 232, 211, 171)
)
$titleBrush = New-Object System.Drawing.SolidBrush(
  [System.Drawing.Color]::FromArgb(255, 247, 241, 231)
)
$bodyBrush = New-Object System.Drawing.SolidBrush(
  [System.Drawing.Color]::FromArgb(255, 240, 233, 220)
)
$chipBrush = New-Object System.Drawing.SolidBrush(
  [System.Drawing.Color]::FromArgb(182, 247, 243, 236)
)
$chipTextBrush = New-Object System.Drawing.SolidBrush(
  [System.Drawing.Color]::FromArgb(255, 38, 77, 59)
)

$eyebrowFont = New-Object System.Drawing.Font(
  "Segoe UI Semibold",
  18,
  [System.Drawing.FontStyle]::Bold
)
$titleFont = New-Object System.Drawing.Font(
  "Georgia",
  38,
  [System.Drawing.FontStyle]::Bold
)
$bodyFont = New-Object System.Drawing.Font(
  "Segoe UI",
  20,
  [System.Drawing.FontStyle]::Regular
)
$chipFont = New-Object System.Drawing.Font(
  "Segoe UI Semibold",
  18,
  [System.Drawing.FontStyle]::Bold
)
$footerFont = New-Object System.Drawing.Font(
  "Segoe UI Semibold",
  16,
  [System.Drawing.FontStyle]::Bold
)

$graphics.DrawString("OFFICIAL WEBSITE", $eyebrowFont, $eyebrowBrush, 286, 98)

$titleY = 136
foreach ($line in (Get-WrappedLines -Graphics $graphics -Text "Scouts Maison de La Paix" -Font $titleFont -MaxWidth 720)) {
  $graphics.DrawString($line, $titleFont, $titleBrush, 286, $titleY)
  $titleY += 56
}

$descriptionText = "Peace-centered scouting association in Taourirt, Morocco. Discover programs, community impact, and official contact details."
$bodyY = 292
foreach ($line in (Get-WrappedLines -Graphics $graphics -Text $descriptionText -Font $bodyFont -MaxWidth 640)) {
  $graphics.DrawString($line, $bodyFont, $bodyBrush, 286, $bodyY)
  $bodyY += 34
}

$chipPath = New-RoundedRectanglePath -X 286 -Y 426 -Width 270 -Height 56 -Radius 18
$graphics.FillPath($chipBrush, $chipPath)
$graphics.DrawString("Taourirt, Morocco", $chipFont, $chipTextBrush, 312, 440)

$siteY = 494
foreach ($line in (Get-WrappedLines -Graphics $graphics -Text "scoutsmaisonpaix.org" -Font $eyebrowFont -MaxWidth 280)) {
  $graphics.DrawString($line, $eyebrowFont, $eyebrowBrush, 286, $siteY)
  $siteY += 24
}

$footerText = "Scouting | Peace Education | Community"
$footerSize = $graphics.MeasureString($footerText, $footerFont)
$footerX = [Math]::Max(286, [int](1104 - $footerSize.Width))
$graphics.DrawString($footerText, $footerFont, $eyebrowBrush, $footerX, 522)

$bitmap.Save($outputPath, [System.Drawing.Imaging.ImageFormat]::Png)

$chipPath.Dispose()
$panelPath.Dispose()
$panelBrush.Dispose()
$panelBorder.Dispose()
$overlayBrush.Dispose()
$glowBrush.Dispose()
$eyebrowBrush.Dispose()
$titleBrush.Dispose()
$bodyBrush.Dispose()
$chipBrush.Dispose()
$chipTextBrush.Dispose()
$eyebrowFont.Dispose()
$titleFont.Dispose()
$bodyFont.Dispose()
$chipFont.Dispose()
$footerFont.Dispose()
$heroImage.Dispose()
$logoImage.Dispose()
$graphics.Dispose()
$bitmap.Dispose()

Write-Output "Created $outputPath"
