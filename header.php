<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php wp_title('|', true, 'right'); ?><?php bloginfo('name'); ?></title>
    <meta name="description" content="<?php bloginfo('description'); ?>">
    <meta name="theme-color" content="#667eea">
    
    <!-- PWA Manifest -->
    <link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/manifest.json">
    
    <!-- Iconos -->
    <link rel="icon" type="image/png" sizes="192x192" href="<?php echo get_template_directory_uri(); ?>/assets/icon-192.png">
    <link rel="apple-touch-icon" href="<?php echo get_template_directory_uri(); ?>/assets/icon-192.png">
    
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>

<!-- Sistema de notificaciones -->
<div id="notification-container" class="notification-container"></div>

<!-- Modal de Login -->
<div id="login-modal" class="modal">
    <div class="modal-content">
        <span class="close">&times;</span>
        <h2><?php _e('Acceso de Vecinos', 'terrazas-bel-air'); ?></h2>
        <form id="login-form">
            <div class="form-group">
                <label for="vivienda"><?php _e('Número de Vivienda:', 'terrazas-bel-air'); ?></label>
                <select id="vivienda" required>
                    <option value=""><?php _e('Selecciona tu vivienda', 'terrazas-bel-air'); ?></option>
                    <?php
                    $homes = get_option('community_homes_list', array('1A', '1B', '1C', '2A', '2B', '2C'));
                    foreach ($homes as $home) {
                        echo '<option value="' . esc_attr($home) . '">' . esc_html($home) . '</option>';
                    }
                    ?>
                </select>
            </div>
            <div class="form-group">
                <label for="password"><?php _e('Contraseña:', 'terrazas-bel-air'); ?></label>
                <input type="password" id="password" required placeholder="<?php _e('Introduce tu contraseña', 'terrazas-bel-air'); ?>">
            </div>
            <button type="submit" class="btn-primary"><?php _e('Iniciar Sesión', 'terrazas-bel-air'); ?></button>
        </form>
    </div>
</div>

<header class="header">
    <div class="container">
        <div class="header-content">
            <div class="header-left">
                <h1><i class="fas fa-home"></i> <?php echo get_option('community_name', get_bloginfo('name')); ?></h1>
                <p class="subtitle"><?php echo get_option('community_subtitle', get_bloginfo('description')); ?></p>
            </div>
            <div class="header-right">
                <button id="language-btn" class="header-btn" title="<?php _e('Cambiar idioma', 'terrazas-bel-air'); ?>">
                    <i class="fas fa-globe"></i>
                    <span id="current-lang">ES</span>
                </button>
                <button id="notifications-btn" class="header-btn">
                    <i class="fas fa-bell"></i>
                    <span id="notification-count" class="notification-badge">0</span>
                </button>
                <button id="login-btn" class="header-btn">
                    <i class="fas fa-user"></i>
                </button>
            </div>
        </div>
    </div>
</header>

<nav class="nav">
    <div class="container">
        <button class="nav-btn active" data-section="inicio">
            <i class="fas fa-home"></i>
            <span><?php _e('Inicio', 'terrazas-bel-air'); ?></span>
        </button>
        <button class="nav-btn" data-section="mejoras">
            <i class="fas fa-tools"></i>
            <span><?php _e('Mejoras', 'terrazas-bel-air'); ?></span>
        </button>
        <button class="nav-btn" data-section="mantenimiento">
            <i class="fas fa-wrench"></i>
            <span><?php _e('Mantenimiento', 'terrazas-bel-air'); ?></span>
        </button>
        <button class="nav-btn" data-section="deudores">
            <i class="fas fa-exclamation-triangle"></i>
            <span><?php _e('Deudores', 'terrazas-bel-air'); ?></span>
        </button>
        <button class="nav-btn" data-section="actas">
            <i class="fas fa-file-alt"></i>
            <span><?php _e('Actas', 'terrazas-bel-air'); ?></span>
        </button>
        <button class="nav-btn" data-section="galeria">
            <i class="fas fa-images"></i>
            <span><?php _e('Galería', 'terrazas-bel-air'); ?></span>
        </button>
        <button class="nav-btn" data-section="sugerencias">
            <i class="fas fa-comment-dots"></i>
            <span><?php _e('Sugerencias', 'terrazas-bel-air'); ?></span>
        </button>
        <button class="nav-btn" data-section="documentos">
            <i class="fas fa-folder"></i>
            <span><?php _e('Documentos', 'terrazas-bel-air'); ?></span>
        </button>
        <button class="nav-btn" data-section="contactos">
            <i class="fas fa-address-book"></i>
            <span><?php _e('Contactos', 'terrazas-bel-air'); ?></span>
        </button>
    </div>
</nav>