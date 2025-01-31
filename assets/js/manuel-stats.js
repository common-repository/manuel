/**

This JavaScript code is used to handle the click event on the "Edit Link" button.

When the button is clicked, a prompt is displayed asking for a new URL for the broken link.

If the user inputs a new URL, an AJAX call is made to update the post with the new URL.

If the AJAX call is successful, a success message is displayed.

If the AJAX call fails, an error message is displayed.
*/

jQuery(document).ready(function ($) {
    // Edit link click event.
    $('.edit-link').on('click', function () {
        var postId = $(this).data('post-id');
        var originalLink = $(this).data('original-link');

        // Display a prompt to input the new URL
        var newLink = prompt('Enter the new URL for the broken link:', originalLink);
        if (newLink !== null && newLink !== originalLink) {
            // Call the AJAX function to update the post with the new URL.
            $.ajax({
                url: ajaxurl,
                type: 'POST',
                data: {
                    action: 'manuel_update_link',
                    post_id: postId,
                    original_link: originalLink,
                    new_link: newLink,
                    anchor_text: $(this).closest('tr').find('td:nth-child(4)').text(),
                    time_removed: $(this).closest('tr').find('td:nth-child(5)').text(),
                    nonce: manuelStats.nonce
                },
                success: function (response) {
                    if (response.success) {
                        // Show a success message after the AJAX call is successful.
                        alert('Link updated successfully');
                    } else {
                        alert('Error: ' + response.data);
                    }
                },
                error: function () {
                    alert('An error occurred while updating the link.');
                }
            });            
        }
    });
});