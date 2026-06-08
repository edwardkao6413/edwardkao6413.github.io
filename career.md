---
layout: default
title: Career
permalink: /career
---

{% assign start_year = 2014 %}
{% assign start_month = 8 %}
{% assign end_year = site.time | date: "%Y" | plus: 0 %}
{% assign px_per_year = 80 %}
{% assign svg_top_pad = 20 %}
{% assign svg_bottom_pad = 24 %}
{% assign display_end_year = end_year | plus: 1 %}
{% assign now_month = site.time | date: "%-m" | plus: 0 %}
{% assign total_years = display_end_year | minus: start_year %}
{% comment %}Extra px below start_year Jan tick to reach start_month{% endcomment %}
{% assign extra_months = start_month | minus: 1 %}
{% assign extra_px = extra_months | times: 80 | divided_by: 12 %}
{% assign svg_height = total_years | times: px_per_year | plus: svg_top_pad | plus: svg_bottom_pad | plus: extra_px %}
{% assign tick_years = end_year | minus: start_year %}
{% assign total_steps = tick_years | divided_by: 2 %}

{% comment %}Lane x positions — one per category{% endcomment %}
{% assign spine_x       = 50 %}
{% assign lane_edu      = 66 %}
{% assign lane_work     = 84 %}
{% assign lane_research = 102 %}
{% assign lane_amateur  = 120 %}
{% assign lane_w        = 7 %}
{% assign label_left_x  = 136 %}
{% assign label_right_x = 360 %}

<div class="page-content">
  <h1>Career</h1>

  <div class="tl-legend" aria-label="Timeline category legend">
    <span>
      <span class="tl-legend__swatch" style="background:#1a7a6e;" aria-hidden="true"></span>Work
    </span>
    <span>
      <span class="tl-legend__swatch" style="background:#1b3a52;" aria-hidden="true"></span>Research
    </span>
    <span>
      <span class="tl-legend__swatch" style="background:#7a4f28;" aria-hidden="true"></span>Education
    </span>
    <span>
      <span class="tl-legend__swatch" style="background:#6b4fa0;" aria-hidden="true"></span>Amateur Interest
    </span>
  </div>

  <section class="tl-wrap" aria-label="Career timeline">

    <svg viewBox="0 0 630 {{ svg_height }}" width="100%" role="img"
         aria-label="Career timeline from {{ start_year }} to {{ end_year }}"
         xmlns="http://www.w3.org/2000/svg">

      {% assign spine_bottom = svg_height | minus: svg_bottom_pad %}

      <!-- main black spine on the left -->
      <line x1="{{ spine_x }}" y1="{{ svg_top_pad }}" x2="{{ spine_x }}" y2="{{ spine_bottom }}"
            stroke="#0d1b2a" stroke-width="3" stroke-linecap="round"/>

      <!-- ghost spines (faint full-height tracks for each lane) -->
      <line x1="{{ lane_work }}"     y1="{{ svg_top_pad }}" x2="{{ lane_work }}"     y2="{{ spine_bottom }}" stroke="#1a7a6e" stroke-width="{{ lane_w }}" stroke-linecap="round" opacity="0.08"/>
      <line x1="{{ lane_research }}" y1="{{ svg_top_pad }}" x2="{{ lane_research }}" y2="{{ spine_bottom }}" stroke="#1b3a52" stroke-width="{{ lane_w }}" stroke-linecap="round" opacity="0.08"/>
      <line x1="{{ lane_edu }}"      y1="{{ svg_top_pad }}" x2="{{ lane_edu }}"      y2="{{ spine_bottom }}" stroke="#7a4f28" stroke-width="{{ lane_w }}" stroke-linecap="round" opacity="0.08"/>
      <line x1="{{ lane_amateur }}"  y1="{{ svg_top_pad }}" x2="{{ lane_amateur }}"  y2="{{ spine_bottom }}" stroke="#6b4fa0" stroke-width="{{ lane_w }}" stroke-linecap="round" opacity="0.08"/>

      <!-- now dot + label on the black spine -->
      <circle cx="{{ spine_x }}" cy="{{ svg_top_pad }}" r="5" fill="#1a7a6e" stroke="#faf8f4" stroke-width="2"/>
      {% assign now_label_y = svg_top_pad | minus: 10 %}
      <text x="{{ spine_x }}" y="{{ now_label_y }}" text-anchor="middle"
            font-family="DM Sans,sans-serif" font-size="10" font-weight="700"
            fill="#1a7a6e" letter-spacing="1.5" aria-hidden="true">NOW</text>

      <!-- year ticks + labels -->
      {% assign tick_left_x  = spine_x | minus: 38 %}
      {% assign tick_label_x = spine_x | minus: 6 %}
      {% for i in (0..total_steps) %}
        {% assign offset = i | times: 2 %}
        {% assign tick_year = start_year | plus: offset %}
        {% if tick_year > end_year %}{% break %}{% endif %}
        {% assign years_from_top = display_end_year | minus: tick_year %}
        {% assign tick_y = years_from_top | times: px_per_year | plus: svg_top_pad %}
        {% assign tick_x2 = lane_amateur | plus: 6 %}
        {% assign tick_label_y = tick_y | plus: 4 %}
        <line x1="{{ tick_left_x }}" y1="{{ tick_y }}" x2="{{ tick_x2 }}" y2="{{ tick_y }}"
              stroke="#c8c8c8" stroke-width="1" stroke-dasharray="2,3"/>
        <text x="{{ tick_label_x }}" y="{{ tick_label_y }}" text-anchor="end"
              font-family="DM Sans,sans-serif" font-size="11" font-weight="600"
              fill="#5a5a5a" aria-hidden="true">{{ tick_year }}</text>
      {% endfor %}

      <!-- event bars + leader lines + labels -->
      {% for event in site.data.career %}
        {% comment %}
          months_from_top(year, month) = (display_end_year - year)*12 - (month - 1)
          Multiply before dividing to avoid Liquid truncation of 80/12=6.
        {% endcomment %}
        {% assign ev_start_year  = event.start_year  | plus: 0 %}
        {% assign ev_start_month = event.start_month | plus: 0 %}

        {% if event.present %}
          {% assign bar_top        = svg_top_pad %}
          {% assign end_total_months = 0 %}
        {% else %}
          {% assign ev_end_year  = event.end_year  | plus: 0 %}
          {% assign ev_end_month = event.end_month | plus: 0 %}
          {% assign end_years_gap    = display_end_year | minus: ev_end_year %}
          {% assign end_total_months = end_years_gap | times: 12 | minus: ev_end_month | plus: 1 %}
          {% assign bar_top = end_total_months | times: 80 | divided_by: 12 | plus: svg_top_pad %}
        {% endif %}

        {% assign start_total_months = display_end_year | minus: ev_start_year | times: 12 | minus: ev_start_month | plus: 1 %}
        {% assign duration_months = start_total_months | minus: end_total_months %}
        {% assign bar_h = duration_months | times: 80 | divided_by: 12 %}

        {% comment %}Assign lane x and color by category{% endcomment %}
        {% if event.category == "work" %}
          {% assign bar_x     = lane_work %}
          {% assign bar_color = "#1a7a6e" %}
          {% assign label_x   = label_right_x %}
        {% elsif event.category == "research" %}
          {% assign bar_x     = lane_research %}
          {% assign bar_color = "#1b3a52" %}
          {% assign label_x   = label_left_x %}
        {% elsif event.category == "education" %}
          {% assign bar_x     = lane_edu %}
          {% assign bar_color = "#7a4f28" %}
          {% assign label_x   = label_left_x %}
        {% else %}
          {% assign bar_x     = lane_amateur %}
          {% assign bar_color = "#6b4fa0" %}
          {% assign label_x   = label_right_x %}
        {% endif %}

        {% assign leader_offset = event.leader_y_offset | default: 0 | plus: 0 %}
        {% if event.leader_anchor == "top" %}
          {% assign leader_y = bar_top | plus: leader_offset %}
        {% else %}
          {% assign bar_mid  = bar_h | divided_by: 2 %}
          {% assign leader_y = bar_top | plus: bar_mid | plus: leader_offset %}
        {% endif %}
        {% assign title_y   = leader_y | plus: 4 %}
        {% assign desc_y    = title_y  | plus: 14 %}

        {% assign bar_bottom = bar_top | plus: bar_h %}
        <line x1="{{ bar_x }}" y1="{{ bar_top }}" x2="{{ bar_x }}" y2="{{ bar_bottom }}"
              stroke="{{ bar_color }}" stroke-width="{{ lane_w }}" stroke-linecap="round"/>
        <line x1="{{ bar_x }}" y1="{{ leader_y }}" x2="{{ label_x }}" y2="{{ leader_y }}"
              stroke="{{ bar_color }}" stroke-width="1.2" opacity="0.6" aria-hidden="true"/>
        {% if event.url %}
        <a href="{{ event.url }}" target="_blank" rel="noopener">
        <text x="{{ label_x }}" y="{{ title_y }}"
              font-family="DM Sans,sans-serif" font-size="12" font-weight="600"
              fill="{{ bar_color }}" text-decoration="underline" aria-hidden="true">{{ event.label }}</text>
        </a>
        {% else %}
        <text x="{{ label_x }}" y="{{ title_y }}"
              font-family="DM Sans,sans-serif" font-size="12" font-weight="600"
              fill="#2c2c2c" aria-hidden="true">{{ event.label }}</text>
        {% endif %}
        {% if event.description %}
        <text x="{{ label_x }}" y="{{ desc_y }}"
              font-family="DM Sans,sans-serif" font-size="10" font-weight="400"
              fill="{{ bar_color }}" aria-hidden="true">{{ event.description }}</text>
        {% endif %}
      {% endfor %}

    </svg>

  </section>

</div>
