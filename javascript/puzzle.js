$(function () {
    var totalPieces = 9;
    var placedPieces = 0;

    function updateStatus() {
        var message = placedPieces + ' of ' + totalPieces + ' pieces placed';

        if (placedPieces === totalPieces) {
            message = 'Puzzle complete. Nice work!';
        }

        $('#status-message').text(message);
    }

    $('.puzzle-grid-drop').droppable({
        accept: '.puzzle-piece',
        tolerance: 'intersect'
    });

    $('.puzzle-piece').each(function () {
        var $piece = $(this);
        var pieceId = $piece.attr('id').replace('-draggable', '');
        var targetId = pieceId.replace('img', 'grid');
        var $target = $('#' + targetId);

        $piece.draggable({
            revert: 'invalid',
            snap: '.puzzle-grid-drop',
            snapMode: 'inner',
            start: function () {
                $piece.css('transform', 'scale(1)');
            }
        });

        $target.droppable('option', 'drop', function (event, ui) {
            if (ui.draggable.attr('id') !== $piece.attr('id')) {
                ui.draggable.draggable('option', 'revert', true);
                return;
            }

            var targetOffset = $target.offset();

            ui.draggable
                .draggable('option', 'revert', false)
                .draggable('disable')
                .offset({
                    top: targetOffset.top,
                    left: targetOffset.left
                })
                .addClass('is-placed');

            $target.droppable('disable');
            placedPieces += 1;
            updateStatus();
        });
    });

    updateStatus();
});
