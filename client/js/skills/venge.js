game.skills.venge = {
  stun: {
    cast: function (skill, source, target) {
      source.addStun(target, skill);
      source.damage(skill.data('damage'), target, skill.data('damage type'));      
    }
  },
  corruption: {
    cast: function (skill, source, target) {
      var range = skill.data('aoe range');
      var width = skill.data('aoe width');
      var damage = skill.data('damage');
      source.opponentsInLine(target, range, width, function (card) {
        source.damage(damage, card, skill.data('damage type'));
        source.addBuff(card, skill);
      });
    }
  },
  passive: {
    passive: function (skill, source) {
      var side = source.side();
      $('.map .heroes.'+side).each(function () {
        var ally = $(this);
        source.addBuff(ally, skill);
      });

      /*var range = 2;
      source.cardsInRange(range, function (card) {
          source.addBuff(card, skill);
      });*/    
    }
  },
  ult: {
    cast: function (skill, source, target) {
      target.purge();
      var sourcePosition = source.getPosition();
      var targetPosition = target.getPosition();
      source.place(targetPosition).select();
      target.place(sourcePosition);
    }
  }
};