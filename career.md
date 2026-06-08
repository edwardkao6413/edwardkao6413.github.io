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
{% comment %}Extra px below start_year Jan tick to reach start_month (start_month-1 months * px_per_month){% endcomment %}
{% assign extra_months = start_month | minus: 1 %}
{% assign extra_px = extra_months | times: 80 | divided_by: 12 %}
{% assign svg_height = total_years | times: px_per_year | plus: svg_top_pad | plus: svg_bottom_pad | plus: extra_px %}
{% assign tick_years = end_year | minus: start_year %}
{% assign total_steps = tick_years | divided_by: 2 %}
{% assign spine_x = 54 %}
{% assign bar_x0 = 59 %}
{% assign bar_x0_right = 65 %}
{% assign bar_x1 = 69 %}
{% assign bar_x1_right = 75 %}
{% assign leader_anchor = 8 %}
{% assign leader_end_x = 90 %}
{% assign label_x = 96 %}

<div class="page-content">
  <h1>Career</h1>

  <div class="tl-legend" aria-label="Timeline category legend">
    <span>
      <span class="tl-legend__swatch" style="background:var(--color-teal-600);" aria-hidden="true"></span>Work
    </span>
    <span>
      <span class="tl-legend__swatch" style="background:var(--color-navy-700);" aria-hidden="true"></span>Research
    </span>
    <span>
      <span class="tl-legend__swatch" style="background:var(--color-edu);" aria-hidden="true"></span>Education
    </span>
    <span>
      <span class="tl-legend__swatch" style="background:var(--color-amateur);" aria-hidden="true"></span>Amateur Interest
    </span>
  </div>

  <section class="tl-wrap" aria-label="Career timeline">

    <svg viewBox="0 0 480 {{ svg_height }}" width="100%" role="img"
         aria-label="Career timeline from {{ start_year }} to {{ end_year }}"
         xmlns="http://www.w3.org/2000/svg">

      <!-- spine -->
      {% assign spine_bottom = svg_height | minus: svg_bottom_pad %}
      <line x1="{{ spine_x }}" y1="{{ svg_top_pad }}" x2="{{ spine_x }}" y2="{{ spine_bottom }}"
            stroke="#0d1b2a" stroke-width="5" stroke-linecap="round"/>

      <!-- now dot + label -->
      <circle cx="{{ spine_x }}" cy="{{ svg_top_pad }}" r="5" fill="#1a7a6e" stroke="#faf8f4" stroke-width="2"/>
      {% assign now_label_y = svg_top_pad | minus: 10 %}
      <text x="{{ spine_x }}" y="{{ now_label_y }}" text-anchor="middle"
            font-family="DM Sans,sans-serif" font-size="10" font-weight="700"
            fill="#1a7a6e" letter-spacing="1.5" aria-hidden="true">NOW</text>

      <!-- year ticks: every 2 years from start_year to end_year -->
      {% for i in (0..total_steps) %}
        {% assign offset = i | times: 2 %}
        {% assign tick_year = start_year | plus: offset %}
        {% if tick_year > end_year %}{% break %}{% endif %}
        {% assign years_from_top = display_end_year | minus: tick_year %}
        {% assign tick_y = years_from_top | times: px_per_year | plus: svg_top_pad %}
        {% assign tick_x1 = spine_x | minus: 8 %}
        {% assign tick_x2 = spine_x | plus: 3 %}
        {% assign year_label_x = spine_x | minus: 12 %}
        {% assign year_label_y = tick_y | plus: 4 %}
        <line x1="{{ tick_x1 }}" y1="{{ tick_y }}" x2="{{ tick_x2 }}" y2="{{ tick_y }}"
              stroke="#c8c8c8" stroke-width="1"/>
        <text x="{{ year_label_x }}" y="{{ year_label_y }}" text-anchor="end"
              font-family="DM Sans,sans-serif" font-size="11" font-weight="600"
              fill="#5a5a5a" aria-hidden="true">{{ tick_year }}</text>
      {% endfor %}

      <!-- event bars, leader lines, and inline SVG labels -->
      {% for event in site.data.career %}
        {% if event.present %}
          {% assign ev_end_year  = end_year %}
          {% assign ev_end_month = now_month %}
        {% else %}
          {% assign ev_end_year  = event.end_year  | plus: 0 %}
          {% assign ev_end_month = event.end_month | plus: 0 %}
        {% endif %}
        {% assign ev_start_year  = event.start_year  | plus: 0 %}
        {% assign ev_start_month = event.start_month | plus: 0 %}
        {% comment %}
          months_from_top(year, month) = (display_end_year - year)*12 - (month - 1)
          Jan of display_end_year = 0, Dec of display_end_year-1 = 1, Jan of display_end_year-1 = 12
          Multiply before dividing to avoid Liquid integer truncation of 80/12=6.
        {% endcomment %}
        {% assign end_years_gap    = display_end_year | minus: ev_end_year %}
        {% assign end_total_months = end_years_gap | times: 12 | minus: ev_end_month | plus: 1 %}
        {% assign bar_top = end_total_months | times: 80 | divided_by: 12 | plus: svg_top_pad %}
        {% assign start_total_months = display_end_year | minus: ev_start_year | times: 12 | minus: ev_start_month | plus: 1 %}
        {% assign duration_months = start_total_months | minus: end_total_months %}
        {% assign bar_h = duration_months | times: 80 | divided_by: 12 %}
        {% assign leader_offset = event.leader_y_offset | default: 0 | plus: 0 %}
        {% if event.layer == 1 %}
          {% assign bar_x = bar_x1 %}
          {% assign bar_right = bar_x1_right %}
        {% else %}
          {% assign bar_x = bar_x0 %}
          {% assign bar_right = bar_x0_right %}
        {% endif %}
        {% if event.category == "work" %}
          {% assign bar_color = "#1a7a6e" %}
        {% elsif event.category == "research" %}
          {% assign bar_color = "#1b3a52" %}
        {% elsif event.category == "education" %}
          {% assign bar_color = "#7a4f28" %}
        {% else %}
          {% assign bar_color = "#6b4fa0" %}
        {% endif %}
        <rect x="{{ bar_x }}" y="{{ bar_top }}" width="6" height="{{ bar_h }}"
              rx="3" fill="{{ bar_color }}"/>
        {% assign leader_y = bar_top | plus: leader_anchor | plus: leader_offset %}
        <line x1="{{ bar_right }}" y1="{{ leader_y }}" x2="{{ leader_end_x }}" y2="{{ leader_y }}"
              stroke="{{ bar_color }}" stroke-width="1.5" opacity="0.7" aria-hidden="true"/>
        {% assign title_y = leader_y | plus: 4 %}
        {% assign desc_y  = title_y  | plus: 14 %}
        <text x="{{ label_x }}" y="{{ title_y }}"
              font-family="DM Sans,sans-serif" font-size="12" font-weight="600"
              fill="#2c2c2c" aria-hidden="true">{{ event.label }}</text>
        {% if event.description %}
        <text x="{{ label_x }}" y="{{ desc_y }}"
              font-family="DM Sans,sans-serif" font-size="10" font-weight="400"
              fill="#7a4f28" aria-hidden="true">{{ event.description }}</text>
        {% endif %}
      {% endfor %}

    </svg>

  </section>

</div>
