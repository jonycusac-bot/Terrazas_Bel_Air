<footer class="footer">
    <div class="container">
        <p>&copy; <?php echo date('Y'); ?> <?php echo get_option('community_name', get_bloginfo('name')); ?>. <?php _e('Todos los derechos reservados', 'terrazas-bel-air'); ?>.</p>
        <p><?php _e('Administrador:', 'terrazas-bel-air'); ?> <a href="tel:<?php echo get_option('admin_phone', '+34952888888'); ?>"><?php echo get_option('admin_phone', '+34 952 88 88 88'); ?></a></p>
    </div>
</footer>

<!-- Modal para ver imágenes -->
<div id="image-modal" class="modal">
    <div class="modal-content image-modal-content">
        <span class="close">&times;</span>
        <img id="modal-image" src="" alt="">
        <div id="modal-caption"></div>
    </div>
</div>

<?php wp_footer(); ?>

<!-- PWA Service Worker -->
<script>
    // Registrar Service Worker para PWA
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('<?php echo get_template_directory_uri(); ?>/sw.js')
                .then(function(registration) {
                    console.log('✅ Service Worker registrado:', registration.scope);
                })
                .catch(function(error) {
                    console.log('❌ Error registrando Service Worker:', error);
                });
        });
    }
</script>

</body>
</html>