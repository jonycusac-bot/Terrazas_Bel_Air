<?php
/**
 * Funciones del tema Terrazas de Bel Air
 */

// Evitar acceso directo
if (!defined('ABSPATH')) {
    exit;
}

// Configuración del tema
function terrazas_bel_air_setup() {
    // Soporte para traducciones
    load_theme_textdomain('terrazas-bel-air', get_template_directory() . '/languages');
    
    // Soporte para título dinámico
    add_theme_support('title-tag');
    
    // Soporte para imágenes destacadas
    add_theme_support('post-thumbnails');
    
    // Soporte para menús
    register_nav_menus(array(
        'primary' => __('Menú Principal', 'terrazas-bel-air'),
    ));
}
add_action('after_setup_theme', 'terrazas_bel_air_setup');

// Encolar estilos y scripts
function terrazas_bel_air_scripts() {
    // Estilos
    wp_enqueue_style('terrazas-bel-air-style', get_stylesheet_uri());
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
    
    // Scripts
    wp_enqueue_script('terrazas-bel-air-translations', get_template_directory_uri() . '/translations.js', array(), '1.0', true);
    wp_enqueue_script('terrazas-bel-air-script', get_template_directory_uri() . '/script.js', array('jquery'), '1.0', true);
    
    // Localizar script para AJAX
    wp_localize_script('terrazas-bel-air-script', 'ajax_object', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('terrazas_bel_air_nonce')
    ));
}
add_action('wp_enqueue_scripts', 'terrazas_bel_air_scripts');

// Registrar tipos de post personalizados
function terrazas_bel_air_custom_post_types() {
    // Mejoras
    register_post_type('community_improvement', array(
        'labels' => array(
            'name' => __('Mejoras', 'terrazas-bel-air'),
            'singular_name' => __('Mejora', 'terrazas-bel-air'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail'),
        'menu_icon' => 'dashicons-hammer',
    ));
    
    // Actualizaciones
    register_post_type('community_update', array(
        'labels' => array(
            'name' => __('Actualizaciones', 'terrazas-bel-air'),
            'singular_name' => __('Actualización', 'terrazas-bel-air'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-megaphone',
    ));
    
    // Mantenimiento
    register_post_type('maintenance_task', array(
        'labels' => array(
            'name' => __('Mantenimiento', 'terrazas-bel-air'),
            'singular_name' => __('Tarea', 'terrazas-bel-air'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-admin-tools',
    ));
    
    // Actas
    register_post_type('meeting_minutes', array(
        'labels' => array(
            'name' => __('Actas', 'terrazas-bel-air'),
            'singular_name' => __('Acta', 'terrazas-bel-air'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor'),
        'menu_icon' => 'dashicons-media-document',
    ));
}
add_action('init', 'terrazas_bel_air_custom_post_types');

// Añadir campos personalizados
function terrazas_bel_air_meta_boxes() {
    // Meta box para mejoras
    add_meta_box(
        'improvement_details',
        __('Detalles de la Mejora', 'terrazas-bel-air'),
        'improvement_meta_box_callback',
        'community_improvement'
    );
}
add_action('add_meta_boxes', 'terrazas_bel_air_meta_boxes');

function improvement_meta_box_callback($post) {
    wp_nonce_field('improvement_meta_box', 'improvement_meta_box_nonce');
    
    $status = get_post_meta($post->ID, 'improvement_status', true);
    $cost = get_post_meta($post->ID, 'improvement_cost', true);
    $date = get_post_meta($post->ID, 'improvement_date', true);
    
    echo '<table class="form-table">';
    echo '<tr>';
    echo '<th><label for="improvement_status">' . __('Estado', 'terrazas-bel-air') . '</label></th>';
    echo '<td>';
    echo '<select id="improvement_status" name="improvement_status">';
    echo '<option value="planned"' . selected($status, 'planned', false) . '>' . __('Planificado', 'terrazas-bel-air') . '</option>';
    echo '<option value="in-progress"' . selected($status, 'in-progress', false) . '>' . __('En Progreso', 'terrazas-bel-air') . '</option>';
    echo '<option value="completed"' . selected($status, 'completed', false) . '>' . __('Completado', 'terrazas-bel-air') . '</option>';
    echo '</select>';
    echo '</td>';
    echo '</tr>';
    echo '<tr>';
    echo '<th><label for="improvement_cost">' . __('Coste', 'terrazas-bel-air') . '</label></th>';
    echo '<td><input type="text" id="improvement_cost" name="improvement_cost" value="' . esc_attr($cost) . '" placeholder="€15,000" /></td>';
    echo '</tr>';
    echo '<tr>';
    echo '<th><label for="improvement_date">' . __('Fecha', 'terrazas-bel-air') . '</label></th>';
    echo '<td><input type="text" id="improvement_date" name="improvement_date" value="' . esc_attr($date) . '" placeholder="Octubre 2024" /></td>';
    echo '</tr>';
    echo '</table>';
}

// Guardar campos personalizados
function save_improvement_meta_box($post_id) {
    if (!isset($_POST['improvement_meta_box_nonce'])) return;
    if (!wp_verify_nonce($_POST['improvement_meta_box_nonce'], 'improvement_meta_box')) return;
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) return;
    if (!current_user_can('edit_post', $post_id)) return;
    
    if (isset($_POST['improvement_status'])) {
        update_post_meta($post_id, 'improvement_status', sanitize_text_field($_POST['improvement_status']));
    }
    if (isset($_POST['improvement_cost'])) {
        update_post_meta($post_id, 'improvement_cost', sanitize_text_field($_POST['improvement_cost']));
    }
    if (isset($_POST['improvement_date'])) {
        update_post_meta($post_id, 'improvement_date', sanitize_text_field($_POST['improvement_date']));
    }
}
add_action('save_post', 'save_improvement_meta_box');

// Página de opciones del tema
function terrazas_bel_air_admin_menu() {
    add_theme_page(
        __('Configuración Comunidad', 'terrazas-bel-air'),
        __('Configuración Comunidad', 'terrazas-bel-air'),
        'manage_options',
        'terrazas-bel-air-options',
        'terrazas_bel_air_options_page'
    );
}
add_action('admin_menu', 'terrazas_bel_air_admin_menu');

function terrazas_bel_air_options_page() {
    if (isset($_POST['submit'])) {
        update_option('community_name', sanitize_text_field($_POST['community_name']));
        update_option('community_subtitle', sanitize_text_field($_POST['community_subtitle']));
        update_option('community_neighbors', intval($_POST['community_neighbors']));
        update_option('community_homes', intval($_POST['community_homes']));
        update_option('community_meetings', intval($_POST['community_meetings']));
        update_option('admin_phone', sanitize_text_field($_POST['admin_phone']));
        
        echo '<div class="notice notice-success"><p>' . __('Configuración guardada.', 'terrazas-bel-air') . '</p></div>';
    }
    
    $community_name = get_option('community_name', 'Terrazas de Bel Air');
    $community_subtitle = get_option('community_subtitle', 'Portal Informativo de Vecinos');
    $community_neighbors = get_option('community_neighbors', '52');
    $community_homes = get_option('community_homes', '26');
    $community_meetings = get_option('community_meetings', '4');
    $admin_phone = get_option('admin_phone', '+34 952 88 88 88');
    
    ?>
    <div class="wrap">
        <h1><?php _e('Configuración de la Comunidad', 'terrazas-bel-air'); ?></h1>
        <form method="post" action="">
            <table class="form-table">
                <tr>
                    <th scope="row"><?php _e('Nombre de la Comunidad', 'terrazas-bel-air'); ?></th>
                    <td><input type="text" name="community_name" value="<?php echo esc_attr($community_name); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th scope="row"><?php _e('Subtítulo', 'terrazas-bel-air'); ?></th>
                    <td><input type="text" name="community_subtitle" value="<?php echo esc_attr($community_subtitle); ?>" class="regular-text" /></td>
                </tr>
                <tr>
                    <th scope="row"><?php _e('Número de Vecinos', 'terrazas-bel-air'); ?></th>
                    <td><input type="number" name="community_neighbors" value="<?php echo esc_attr($community_neighbors); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><?php _e('Número de Viviendas', 'terrazas-bel-air'); ?></th>
                    <td><input type="number" name="community_homes" value="<?php echo esc_attr($community_homes); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><?php _e('Reuniones este Año', 'terrazas-bel-air'); ?></th>
                    <td><input type="number" name="community_meetings" value="<?php echo esc_attr($community_meetings); ?>" /></td>
                </tr>
                <tr>
                    <th scope="row"><?php _e('Teléfono Administrador', 'terrazas-bel-air'); ?></th>
                    <td><input type="text" name="admin_phone" value="<?php echo esc_attr($admin_phone); ?>" class="regular-text" /></td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

// AJAX para formulario de sugerencias
function handle_suggestion_form() {
    check_ajax_referer('terrazas_bel_air_nonce', 'nonce');
    
    $resident_info = sanitize_text_field($_POST['resident_info']);
    $contact_email = sanitize_email($_POST['contact_email']);
    $type = sanitize_text_field($_POST['type']);
    $category = sanitize_text_field($_POST['category']);
    $title = sanitize_text_field($_POST['title']);
    $description = sanitize_textarea_field($_POST['description']);
    $priority = sanitize_text_field($_POST['priority']);
    
    // Enviar email al administrador
    $admin_email = get_option('admin_email');
    $subject = "[{$type}] {$category} - {$title}";
    
    $message = "NUEVA {$type} DESDE EL PORTAL DE LA COMUNIDAD\n\n";
    $message .= "DATOS DEL VECINO: {$resident_info}\n";
    $message .= "EMAIL DE CONTACTO: {$contact_email}\n";
    $message .= "TIPO: {$type}\n";
    $message .= "CATEGORÍA: {$category}\n";
    $message .= "URGENCIA: {$priority}\n\n";
    $message .= "ASUNTO: {$title}\n\n";
    $message .= "DESCRIPCIÓN:\n{$description}\n\n";
    $message .= "FECHA: " . date('d/m/Y H:i:s') . "\n";
    $message .= "Enviado desde: Portal Web " . get_option('community_name');
    
    $sent = wp_mail($admin_email, $subject, $message);
    
    if ($sent) {
        wp_send_json_success('Sugerencia enviada correctamente');
    } else {
        wp_send_json_error('Error al enviar la sugerencia');
    }
}
add_action('wp_ajax_handle_suggestion', 'handle_suggestion_form');
add_action('wp_ajax_nopriv_handle_suggestion', 'handle_suggestion_form');
?>