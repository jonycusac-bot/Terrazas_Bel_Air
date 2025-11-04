<?php
/**
 * Tema: Terrazas de Bel Air
 * Archivo principal del tema
 */

get_header(); ?>

<main class="main">
    <div class="container">
        <!-- Sección Inicio -->
        <section id="inicio" class="section active">
            <div class="welcome-card">
                <h2><?php echo get_option('community_welcome_title', 'Bienvenido a tu Comunidad'); ?></h2>
                <p><?php echo get_option('community_welcome_text', 'Mantente informado sobre todas las novedades y gestiones de nuestra comunidad de vecinos.'); ?></p>
            </div>
            
            <div class="quick-stats">
                <div class="stat-card">
                    <i class="fas fa-users"></i>
                    <h3><?php echo get_option('community_neighbors', '52'); ?></h3>
                    <p><?php _e('Vecinos', 'terrazas-bel-air'); ?></p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-building"></i>
                    <h3><?php echo get_option('community_homes', '26'); ?></h3>
                    <p><?php _e('Viviendas', 'terrazas-bel-air'); ?></p>
                </div>
                <div class="stat-card">
                    <i class="fas fa-calendar"></i>
                    <h3><?php echo get_option('community_meetings', '4'); ?></h3>
                    <p><?php _e('Reuniones este año', 'terrazas-bel-air'); ?></p>
                </div>
            </div>

            <div class="recent-updates">
                <h3><?php _e('Últimas Actualizaciones', 'terrazas-bel-air'); ?></h3>
                <?php
                $updates = new WP_Query(array(
                    'post_type' => 'community_update',
                    'posts_per_page' => 3
                ));
                
                if ($updates->have_posts()) :
                    while ($updates->have_posts()) : $updates->the_post(); ?>
                        <div class="update-item">
                            <div class="update-icon">
                                <i class="fas fa-<?php echo get_post_meta(get_the_ID(), 'update_icon', true) ?: 'info-circle'; ?>"></i>
                            </div>
                            <div class="update-content">
                                <h4><?php the_title(); ?></h4>
                                <p><?php the_excerpt(); ?></p>
                                <span class="update-date"><?php echo human_time_diff(get_the_time('U'), current_time('timestamp')) . ' ago'; ?></span>
                            </div>
                        </div>
                    <?php endwhile;
                    wp_reset_postdata();
                endif; ?>
            </div>
        </section>

        <!-- Sección Mejoras -->
        <section id="mejoras" class="section">
            <h2><?php _e('Mejoras de la Comunidad', 'terrazas-bel-air'); ?></h2>
            
            <?php
            $improvements = new WP_Query(array(
                'post_type' => 'community_improvement',
                'posts_per_page' => -1
            ));
            
            if ($improvements->have_posts()) :
                while ($improvements->have_posts()) : $improvements->the_post();
                    $status = get_post_meta(get_the_ID(), 'improvement_status', true);
                    $cost = get_post_meta(get_the_ID(), 'improvement_cost', true);
                    $date = get_post_meta(get_the_ID(), 'improvement_date', true);
                    ?>
                    <div class="improvement-card">
                        <div class="improvement-header">
                            <h3><?php the_title(); ?></h3>
                            <span class="status <?php echo $status; ?>">
                                <?php 
                                switch($status) {
                                    case 'completed': _e('Completado', 'terrazas-bel-air'); break;
                                    case 'in-progress': _e('En Progreso', 'terrazas-bel-air'); break;
                                    case 'planned': _e('Planificado', 'terrazas-bel-air'); break;
                                }
                                ?>
                            </span>
                        </div>
                        <p><?php the_content(); ?></p>
                        <div class="improvement-details">
                            <?php if ($date) : ?>
                                <span><i class="fas fa-calendar"></i> <?php echo $date; ?></span>
                            <?php endif; ?>
                            <?php if ($cost) : ?>
                                <span><i class="fas fa-euro-sign"></i> <?php echo $cost; ?></span>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endwhile;
                wp_reset_postdata();
            endif; ?>
        </section>

        <!-- Otras secciones... -->
        <?php get_template_part('template-parts/maintenance'); ?>
        <?php get_template_part('template-parts/debtors'); ?>
        <?php get_template_part('template-parts/minutes'); ?>
        <?php get_template_part('template-parts/gallery'); ?>
        <?php get_template_part('template-parts/suggestions'); ?>
        <?php get_template_part('template-parts/documents'); ?>
        <?php get_template_part('template-parts/contacts'); ?>
    </div>
</main>

<?php get_footer(); ?>