<?php
/**
 * BuddyPress - Members Register
 *
 * @package BuddyPress
 * @subpackage bp-legacy
 */

?>

<div id="buddypress" class="registro">


	<?php

	/**
	 * Fires at the top of the BuddyPress member registration page template.
	 *
	 * @since 1.1.0
	 */

	do_action( 'bp_before_register_page' ); ?>

	<div class="page" id="register-page">

		<div class="logo-container"></div>

		<form action="" name="signup_form" id="signup_form" class="standard-form" method="post" enctype="multipart/form-data">

		<?php if ( 'registration-disabled' == bp_get_current_signup_step() ) : ?>
			<?php

			/** This action is documented in bp-templates/bp-legacy/buddypress/activity/index.php */
			do_action( 'template_notices' ); ?>
			<?php

			/**
			 * Fires before the display of the registration disabled message.
			 *
			 * @since 1.5.0
			 */
			do_action( 'bp_before_registration_disabled' ); ?>

				<p><?php _e( 'User registration is currently not allowed.', 'buddypress' ); ?></p>

			<?php

			/**
			 * Fires after the display of the registration disabled message.
			 *
			 * @since 1.5.0
			 */
			do_action( 'bp_after_registration_disabled' ); ?>
		<?php endif; // registration-disabled signup step ?>

		<?php if ( 'request-details' == bp_get_current_signup_step() ) : ?>

			<?php

			/** This action is documented in bp-templates/bp-legacy/buddypress/activity/index.php */
			do_action( 'template_notices' ); ?>

			<p><?php echo("Registre-se inserindo suas informações abaixo.") ?></p>

			<?php

			/**
			 * Fires before the display of member registration account details fields.
			 *
			 * @since 1.1.0
			 */
			do_action( 'bp_before_account_details_fields' ); ?>

			<div class="register-section" id="basic-details-section">

				<?php /***** Basic Account Details ******/ ?>

				<h4><?php _e( 'Account Details', 'buddypress' ); ?></h4>

				<label for="signup_username" style="display:none !important; "><?php _e( 'Username', 'buddypress' ); ?> <?php _e( '(required)', 'buddypress' ); ?></label>
				<?php

				/**
				 * Fires and displays any member registration username errors.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_signup_username_errors' ); ?>
				<input type="text" name="signup_username" id="signup_username" style="display:none !important;" value="<?php bp_signup_username_value(); ?>" <?php bp_form_field_attributes( 'username' ); ?>/>

				<label for="signup_email"><i class="fa fa-envelope-o" aria-hidden="true"></i><?php _e( 'Email Address', 'buddypress' ); ?> </label>
				<?php

				/**
				 * Fires and displays any member registration email errors.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_signup_email_errors' ); ?>
				<input type="email" name="signup_email" id="signup_email" value="<?php bp_signup_email_value(); ?>" <?php bp_form_field_attributes( 'email' ); ?>/>

				<label for="signup_password"><i class="fa fa-key" aria-hidden="true"></i><?php _e( 'Choose a Password', 'buddypress' ); ?> </label>
				<?php

				/**
				 * Fires and displays any member registration password errors.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_signup_password_errors' ); ?>
				<input type="password" name="signup_password" id="signup_password" value="" class="password-entry" <?php bp_form_field_attributes( 'password' ); ?>/>
				<h3 class="pass-lenght">A senha deve ter no mínimo 7 caracteres.</h3>
				<div id="pass-strength-result"></div>

				<label for="signup_password_confirm"><i class="fa fa-key" aria-hidden="true"></i><?php _e( 'Confirm Password', 'buddypress' ); ?> </label>
				<?php

				/**
				 * Fires and displays any member registration password confirmation errors.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_signup_password_confirm_errors' ); ?>
				<input type="password" name="signup_password_confirm" id="signup_password_confirm" value="" class="password-entry-confirm" <?php bp_form_field_attributes( 'password' ); ?>/>

				<input type="text" name="imageSrc" id="imageSrc" value="" class="password-entry-confirm" style="display:none !important;"/>


				<?php

				/**
				 * Fires and displays any extra member registration details fields.
				 *
				 * @since 1.9.0
				 */
				do_action( 'bp_account_details_fields' ); ?>

			</div><!-- #basic-details-section -->

			<?php

			/**
			 * Fires after the display of member registration account details fields.
			 *
			 * @since 1.1.0
			 */
			do_action( 'bp_after_account_details_fields' ); ?>

			<?php /***** Extra Profile Details ******/ ?>

			<?php if ( bp_is_active( 'xprofile' ) ) : ?>

				<?php

				/**
				 * Fires before the display of member registration xprofile fields.
				 *
				 * @since 1.2.4
				 */
				do_action( 'bp_before_signup_profile_fields' ); ?>

				<div class="register-section" id="profile-details-section">

					<h4><?php _e( 'Profile Details', 'buddypress' ); ?></h4>

					<?php /* Use the profile field loop to render input fields for the 'base' profile field group */ ?>
					<?php if ( bp_is_active( 'xprofile' ) ) : if ( bp_has_profile( array( 'profile_group_id' => 1, 'fetch_field_data' => false ) ) ) : while ( bp_profile_groups() ) : bp_the_profile_group(); ?>

					<?php while ( bp_profile_fields() ) : bp_the_profile_field(); ?>

						<div<?php bp_field_css_class( 'editfield' ); ?>>

							<?php
							$field_type = bp_xprofile_create_field_type( bp_get_the_profile_field_type() );
							$field_type->edit_field_html();

							/**
							 * Fires before the display of the visibility options for xprofile fields.
							 *
							 * @since 1.7.0
							 */
							do_action( 'bp_custom_profile_edit_fields_pre_visibility' );

							if ( bp_current_user_can( 'bp_xprofile_change_field_visibility' ) ) : ?>
								<p class="field-visibility-settings-toggle" id="field-visibility-settings-toggle-<?php bp_the_profile_field_id() ?>">
									<?php
									printf(
										__( 'This field can be seen by: %s', 'buddypress' ),
										'<span class="current-visibility-level">' . bp_get_the_profile_field_visibility_level_label() . '</span>'
									);
									?>
									<a href="#" class="visibility-toggle-link"><?php _ex( 'Change', 'Change profile field visibility level', 'buddypress' ); ?></a>
								</p>

								<div class="field-visibility-settings" id="field-visibility-settings-<?php bp_the_profile_field_id() ?>">
									<fieldset style="display: none;">
										<legend><?php _e( 'Who can see this field?', 'buddypress' ) ?></legend>

										<?php bp_profile_visibility_radio_buttons() ?>

									</fieldset>
									<a class="field-visibility-settings-close" href="#"><?php _e( 'Close', 'buddypress' ) ?></a>

								</div>
							<?php else : ?>
								<p class="field-visibility-settings-notoggle" id="field-visibility-settings-toggle-<?php bp_the_profile_field_id() ?>">
									<?php
									printf(
										__( 'This field can be seen by: %s', 'buddypress' ),
										'<span class="current-visibility-level">' . bp_get_the_profile_field_visibility_level_label() . '</span>'
									);
									?>
								</p>
							<?php endif ?>

							<?php

							/**
							 * Fires after the display of the visibility options for xprofile fields.
							 *
							 * @since 1.1.0
							 */
							do_action( 'bp_custom_profile_edit_fields' ); ?>

							<p class="description"><?php bp_the_profile_field_description(); ?></p>

						</div>

					<?php endwhile; ?>

					<input type="hidden" name="signup_profile_field_ids" id="signup_profile_field_ids" value="<?php bp_the_profile_field_ids(); ?>" />

					<?php endwhile; endif; endif; ?>

					<?php

					/**
					 * Fires and displays any extra member registration xprofile fields.
					 *
					 * @since 1.9.0
					 */
					do_action( 'bp_signup_profile_fields' ); ?>

				</div><!-- #profile-details-section -->

				<?php

				/**
				 * Fires after the display of member registration xprofile fields.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_after_signup_profile_fields' ); ?>

			<?php endif; ?>

			<?php if ( bp_get_blog_signup_allowed() ) : ?>

				<?php

				/**
				 * Fires before the display of member registration blog details fields.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_before_blog_details_fields' ); ?>

				<?php /***** Blog Creation Details ******/ ?>

				<div class="register-section" id="blog-details-section">

					<h4><?php _e( 'Blog Details', 'buddypress' ); ?></h4>

					<p><label for="signup_with_blog"><input type="checkbox" name="signup_with_blog" id="signup_with_blog" value="1"<?php if ( (int) bp_get_signup_with_blog_value() ) : ?> checked="checked"<?php endif; ?> /> <?php _e( 'Yes, I\'d like to create a new site', 'buddypress' ); ?></label></p>

					<div id="blog-details"<?php if ( (int) bp_get_signup_with_blog_value() ) : ?>class="show"<?php endif; ?>>

						<label for="signup_blog_url"><?php _e( 'Blog URL', 'buddypress' ); ?> <?php _e( '(required)', 'buddypress' ); ?></label>
						<?php

						/**
						 * Fires and displays any member registration blog URL errors.
						 *
						 * @since 1.1.0
						 */
						do_action( 'bp_signup_blog_url_errors' ); ?>

						<?php if ( is_subdomain_install() ) : ?>
							http:// <input type="text" name="signup_blog_url" id="signup_blog_url" value="<?php bp_signup_blog_url_value(); ?>" /> .<?php bp_signup_subdomain_base(); ?>
						<?php else : ?>
							<?php echo home_url( '/' ); ?> <input type="text" name="signup_blog_url" id="signup_blog_url" value="<?php bp_signup_blog_url_value(); ?>" />
						<?php endif; ?>

						<label for="signup_blog_title"><?php _e( 'Site Title', 'buddypress' ); ?> <?php _e( '(required)', 'buddypress' ); ?></label>
						<?php

						/**
						 * Fires and displays any member registration blog title errors.
						 *
						 * @since 1.1.0
						 */
						do_action( 'bp_signup_blog_title_errors' ); ?>
						<input type="text" name="signup_blog_title" id="signup_blog_title" value="<?php bp_signup_blog_title_value(); ?>" />

						<span class="label"><?php _e( 'I would like my site to appear in search engines, and in public listings around this network.', 'buddypress' ); ?></span>
						<?php

						/**
						 * Fires and displays any member registration blog privacy errors.
						 *
						 * @since 1.1.0
						 */
						do_action( 'bp_signup_blog_privacy_errors' ); ?>

						<label for="signup_blog_privacy_public"><input type="radio" name="signup_blog_privacy" id="signup_blog_privacy_public" value="public"<?php if ( 'public' == bp_get_signup_blog_privacy_value() || !bp_get_signup_blog_privacy_value() ) : ?> checked="checked"<?php endif; ?> /> <?php _e( 'Yes', 'buddypress' ); ?></label>
						<label for="signup_blog_privacy_private"><input type="radio" name="signup_blog_privacy" id="signup_blog_privacy_private" value="private"<?php if ( 'private' == bp_get_signup_blog_privacy_value() ) : ?> checked="checked"<?php endif; ?> /> <?php _e( 'No', 'buddypress' ); ?></label>

						<?php

						/**
						 * Fires and displays any extra member registration blog details fields.
						 *
						 * @since 1.9.0
						 */
						do_action( 'bp_blog_details_fields' ); ?>

					</div>

				</div><!-- #blog-details-section -->

				<?php

				/**
				 * Fires after the display of member registration blog details fields.
				 *
				 * @since 1.1.0
				 */
				do_action( 'bp_after_blog_details_fields' ); ?>

			<?php endif; ?>

			<?php

			/**
			 * Fires before the display of the registration submit buttons.
			 *
			 * @since 1.1.0
			 */
			do_action( 'bp_before_registration_submit_buttons' ); ?>

			<div class="submit">
				<input type="submit" name="signup_submit" id="signup_submit" value="<?php esc_attr_e( 'Complete Sign Up', 'buddypress' ); ?>" disabled="true"/>
			</div>

			<?php

			/**
			 * Fires after the display of the registration submit buttons.
			 *
			 * @since 1.1.0
			 */
			do_action( 'bp_after_registration_submit_buttons' ); ?>

			<?php wp_nonce_field( 'bp_new_signup' ); ?>

		<?php endif; // request-details signup step ?>




		<?php if ( 'completed-confirmation' == bp_get_current_signup_step() ) : ?>

			<?php

			/** This action is documented in bp-templates/bp-legacy/buddypress/activity/index.php */
			do_action( 'template_notices' ); ?>
			<?php

			// ================================ AQUI IA A PORRA DO FIREBASE!!!!!!!!!! ===============================

			/**
			 * Fires before the display of the registration confirmed messages.
			 *
			 * @since 1.5.0
			 */
			do_action( 'bp_before_registration_confirmed' ); ?>

			<?php if ( bp_registration_needs_activation() ) : ?>
				<p><?php _e( 'You have successfully created your account! To begin using this site you will need to activate your account via the email we have just sent to your address.', 'buddypress' ); ?></p>
			<?php else : ?>
				<div class="register-confirmation">
					<div class="loader-app">
					    <div class="spinner">
					      <div class="double-bounce1"></div>
					      <div class="double-bounce2"></div>
					      <div class="loading-text register">Criando usuário...</div>
					      <div class="user-created">
					      		<img src="/img/success.svg">
					      		<span>Usuário criado com sucesso!</span>
					      </div>
					    </div>
					  </div>
				</div>
			<?php endif; ?>

			<?php

			/**
			 * Fires after the display of the registration confirmed messages.
			 *
			 * @since 1.5.0
			 */
			do_action( 'bp_after_registration_confirmed' ); ?>

		<?php endif; // completed-confirmation signup step ?>

		<?php

		/**
		 * Fires and displays any custom signup steps.
		 *
		 * @since 1.1.0
		 */
		do_action( 'bp_custom_signup_steps' ); ?>

		</form>

	</div>
	 

	<?php

	/**
	 * Fires at the bottom of the BuddyPress member registration page template.
	 *
	 * @since 1.1.0
	 */
	do_action( 'bp_after_register_page' ); ?>


	<script>

	;(function ($, window) {

		var intervals = {};
		var removeListener = function(selector) {

		    if (intervals[selector]) {

		        window.clearInterval(intervals[selector]);
		        intervals[selector] = null;
		    }
		};
		var found = 'waitUntilExists.found';

		/**
		 * @function
		 * @property {object} jQuery plugin which runs handler function once specified
		 *           element is inserted into the DOM
		 * @param {function|string} handler 
		 *            A function to execute at the time when the element is inserted or 
		 *            string "remove" to remove the listener from the given selector
		 * @param {bool} shouldRunHandlerOnce 
		 *            Optional: if true, handler is unbound after its first invocation
		 * @example jQuery(selector).waitUntilExists(function);
		 */

		$.fn.waitUntilExists = function(handler, shouldRunHandlerOnce, isChild) {

		    var selector = this.selector;
		    var $this = $(selector);
		    var $elements = $this.not(function() { return $(this).data(found); });

		    if (handler === 'remove') {

		        // Hijack and remove interval immediately if the code requests
		        removeListener(selector);
		    }
		    else {

		        // Run the handler on all found elements and mark as found
		        $elements.each(handler).data(found, true);

		        if (shouldRunHandlerOnce && $this.length) {

		            // Element was found, implying the handler already ran for all 
		            // matched elements
		            removeListener(selector);
		        }
		        else if (!isChild) {

		            // If this is a recurring search or if the target has not yet been 
		            // found, create an interval to continue searching for the target
		            intervals[selector] = window.setInterval(function () {

		                $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
		            }, 500);
		        }
		    }

		    return $this;
		};

		}(jQuery, window));


		
		jQuery('#signup_email').keyup(function() {

			var emailValue = jQuery('#signup_email').val();

		  	jQuery('#signup_username').val(emailValue);
		  	
		});

		jQuery('#signup_password').keyup(function() {

			var emailValue = jQuery('#signup_password').val().length;

			if(emailValue >= 7){
				jQuery('#signup_submit').prop('disabled', false);
			} else {
				jQuery('#signup_submit').prop('disabled', true);
			}
		  	
		});



		jQuery('#tutviet-signup-avatar img').waitUntilExists(function(){

			var userImage =  jQuery('#tutviet-signup-avatar img').attr('src');

			jQuery('#imageSrc').val(userImage);
			
		});


		jQuery('#signup_email').focusout(function(){

			var userName = jQuery('#signup_username');

			var userNameValue = jQuery('#signup_email').val();

			var newUserNameValue = userNameValue.split('.').join('-').split('@').join('-').split('_').join('-');

			userName.val(newUserNameValue);
			
		});




	</script>



</div><!-- #buddypress -->


<style type="text/css">

.user-created {
    position: absolute;
    width: 200px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 200px;
    font-size: 1.6em;
    text-align: center;
    display: none;
}

.user-created img{
	width: 100px;
    display: block;
    margin: auto;
    margin-bottom: 15px;
    
}

.loader-app{
  z-index: 99999999999;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: block !important;
}

.loader-app .spinner{background: -webkit-linear-gradient(rgba(255,255,255,0.95) 0%, rgba(246,246,246,0.95) 100%);background: -o-linear-gradient(rgba(255,255,255,0.95) 0%, rgba(246,246,246,0.95) 100%);background: linear-gradient(rgba(255,255,255,0.95) 0%, rgba(246,246,246,0.95) 100%);display: table;width: 100%;height: 100vh;}

.loading-text{position: absolute; top: 125px; left: 0; right: 0; bottom: 0; margin: auto; width: 300px; height: 30px; text-align: center; /* margin-top: 80px; */ font-size: 20px; display: none;}

.loading-text.register{display: block; font-size: 15px; line-height: 23px;}

.spinner {
  width: 100%;
  height: 40px;
  position: absolute;
  position: relative;
  margin: auto;
  height: 100%;
  display: table-cell;
}

.double-bounce1, .double-bounce2{
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: -moz-linear-gradient(-45deg, rgba(94,202,219,1) 0%, rgba(92,231,210,1) 50%, rgba(64,206,142,1) 100%);
  background: -webkit-gradient(left top, right bottom, color-stop(0%, rgba(94,202,219,1)), color-stop(50%, rgba(92,231,210,1)), color-stop(100%, rgba(64,206,142,1)));
  background: -webkit-linear-gradient(-45deg, rgba(94,202,219,1) 0%, rgba(92,231,210,1) 50%, rgba(64,206,142,1) 100%);
  background: -o-linear-gradient(-45deg, rgba(94,202,219,1) 0%, rgba(92,231,210,1) 50%, rgba(64,206,142,1) 100%);
  background: -ms-linear-gradient(-45deg, rgba(94,202,219,1) 0%, rgba(92,231,210,1) 50%, rgba(64,206,142,1) 100%);
  background: linear-gradient(135deg, rgba(94,202,219,1) 0%, rgba(92,231,210,1) 50%, rgba(64,206,142,1) 100%);
  opacity: 0.6;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-top: 42vh;
  -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
  animation: sk-bounce 2.0s infinite ease-in-out;
}

.double-bounce2 {
  -webkit-animation-delay: -1.0s;
  animation-delay: -1.0s;
}

@-webkit-keyframes sk-bounce {
  0%, 100% { -webkit-transform: scale(0.0) }
  50% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bounce {
  0%, 100% { 
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 50% { 
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

.spinner.created-user .double-bounce1, 
.spinner.created-user .double-bounce2,
.spinner.created-user .loading-text {
	display: none;
}

#back_to_top {
display: none;
}

.container-photo-uploader {
background-color: #eeeeee;
border-radius: 10px;
width: 103%;
}

.content {
margin-top: 0 !important;
padding: 0 !important;
}

.jcrop-holder {
    float: inherit !important;
    display: block !Important;
    margin: 20px auto !Important;
    border: 1px solid #d4d4d4;
}


.registro {
    max-width: 750px;
    margin: auto;
    padding-left: 25% !important;
    padding-right: 25% !important;
    overflow: hidden;
}

.content, .content .container, .full_width {
    background-color: #52be9f !important;
    -webkit-animation: colorchange 15s infinite;
    height: 100%;
    padding-bottom: 5%;
}


h2 {
    display: none;
}

.title_outer.title_without_animation {
    display: none;
}

.header_inner.clearfix {
    display: none;
}

.footer_inner.clearfix {
    display: none;
}

div#basic-details-section {
    display: block;
    width: 100% !important;
}

div#profile-details-section {
    display: block;
    width: 100% !important;
}

input {
    width: 100% !important;
}



div#register-page {
    padding: 10%;
    background-color: #FFF;
    border-radius: 15px;
    overflow: auto;
}

p#field-visibility-settings-toggle-1 {
    display: none;
}

.container-photo-uploader h4 {
    display: none;
}

label {
    font-family: open sans, sans-serif !important;
    font-size: 1.4em !important;
    font-weight: 200 !important;
}

.bp-required-field-label {
	display: none;
}

.logo-container {
    background-size: 340px!important;
    width: 340px;
    height: 140px;
    margin: 0px auto 20px auto;
    background: url('http://awape.com.br/wp-content/uploads/2016/10/logo_awape.png');
    background-repeat: no-repeat;
}

input {
    border: none !important;
    border-bottom: 2px solid #5bc4b4 !important;
    background: none !important;
    outline: none;
    font-size: 1.3em !important;
    color: #818181 !important;
}

input#signup_submit {
    border: 1px solid #1abc9c !Important;
    padding: 14px !important;
    border-radius: 15px;
    color: #1abc9c !important;
    transition: all .4s ease;
}

input#signup_submit:hover {
    background-color: #1abc9c !important;
    color: #FFF !important;
    margin-bottom: 15px !important;
}


div#pass-strength-result {
    display: none !important;
}

i.fa.fa-envelope-o {
    margin-right: 10px;
}

i.fa.fa-key {
    margin-right: 10px;
}

.container-photo-uploader {
    position: relative;
    display: none;
}

div#tutviet-avatar-wrapper {
    padding: 10px;
    overflow: auto;
}



div#tutviet-signup-avatar img {
    border-radius: 50%;
    margin: 0 auto;
    display: block;
}

a.tutviet-button.button.avatar-delete {
    display: block;
    margin: 0 auto;
    width: 30%;
    border: 1px solid #d84141 !important;
    border-radius: 10px;
    font-family: open sans, sans-serif !important;
    font-size: 1em !important;
    color: #d84141 !important;
    font-weight: 800;
}

div#avatar-crop-pane {
    border-radius: 50%;
    margin: 0 auto;

}

input#avatar_crop_submit {
    margin: 15px auto;
    display: block !important;
    width: 40% !important;
    color: #FFF !important;
    font-family: open sans, sans serif;
    padding: 10px !important;
    border-radius: 15px;
    background-color: #4cb5a5 !important;
    border: none !important;
    display: inline-block;
}

.filename {
	visibility: hidden;
	overflow: hidden;
}

.editfield.field_1.field_nome.required-field.visibility-public.field_type_textbox label {
    text-align: center;
    margin-bottom: -20px !important;
    margin-top: 30px !important;
}

.waiting {
    display: none !important;
}


#buddypress .standard-form div.submit input {
    margin-right: 0px !important;
    margin-bottom: 0px !important;
}

.submit {
    margin: auto !important;
    width: 50% !important;
    float: inherit !important;
}

input#field_1 {
    margin-bottom: 15px;
}

a#tv-featured_image-pickfiles {
    background-color: #FFF !important;
    border: 1px solid #5bc4b4 !important;
    background: none !important;
    padding: 11px !important;
    border-radius: 10px;
    color: #5bc4b4 !important;
    font-size: 1.3em;
    display: block;
    margin: 10px auto;
    width: 35%;
    text-align: center;
}

i.fa.fa-camera {
    margin-right: 7px;
}


@media screen and (max-width: 800px) {

.logo-container {
    background-size: contain !important;
    width: 100% !important;
    margin-bottom:0;
}

form p {
    text-align:center;
    margin-bottom: 20px;
}

h3.pass-lenght {
    margin-left: 50%;
    margin-top: -9px;
    font-size: 0.9em;
    width: 50%;
    text-align: right;
    font-style: italic;
}

a#tv-featured_image-pickfiles {
    width: 70% !important;
    overflow: hidden !important;
}

.submit {
    width: 80% !important;
    padding: 10px 10px 0 !important;
}

.field_nome-completo label {
    padding-left: 33px;
}

.field_nome-completo input#field_1{
    border: none !important;
    border-bottom: 2px solid #5bc4b4 !important;
    background: none !important;
    outline: none;
    font-size: 1.3em !important;
    color: #818181 !important;
}

.container_inner.default_template_holder.clearfix.page_container_inner {
    margin: 0 auto !important;
    width: 90%;
    overflow: auto;
}


.registro {
    margin: 15% auto 0;
    padding: 0 !important;
}

div#buddypress {
    padding-left: 0 !important;
    padding-right: 0 !important;
}





}


</style>

